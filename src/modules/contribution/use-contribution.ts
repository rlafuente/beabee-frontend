import { computed, reactive, ref } from 'vue';
import { ContributionPeriod } from '../../utils/enums/contribution-period.enum';
import {
  fetchJoinContent,
  fetchContribution,
  createContribution,
  updateContribution,
  updatePaymentSource as updateBankAccount,
} from './contribution.service';
import {
  ContributionContent,
  CurrentContribution,
  NewContribution,
  PaymentSource,
  Periods,
  ContributionType,
  MembershipStatus,
} from './contribution.interface';
import i18n from '../../i18n';

const { t } = i18n.global;

const currentContribution = reactive<CurrentContribution>({
  amount: 0,
  period: ContributionPeriod.Monthly,
  type: ContributionType.None,
  membershipExpiryDate: '',
  cancellationDate: '',
  membershipStatus: MembershipStatus.None,
});

const paymentSource = reactive<PaymentSource>({
  type: '',
  bankName: '',
  accountHolderName: '',
  accountNumberEnding: '',
});

const hasPaymentSource = computed(() => paymentSource.type);

const setCurrentContribution = () => {
  fetchContribution()
    .then(({ data }) => {
      currentContribution.amount = data.amount;
      currentContribution.period = data.period;
      currentContribution.type = data.type;
      currentContribution.membershipExpiryDate = data.membershipExpiryDate;
      currentContribution.cancellationDate = data.cancellationDate;
      currentContribution.membershipStatus = data.membershipStatus;

      if (data.paymentSource) {
        paymentSource.type = data.paymentSource.type;
        paymentSource.bankName = data.paymentSource.bankName;
        paymentSource.accountHolderName = data.paymentSource.accountHolderName;
        paymentSource.accountNumberEnding =
          data.paymentSource.accountNumberEnding;
      }
    })
    .catch((err) => err);
};

const newContribution = reactive<NewContribution>({
  amount: 5,
  period: ContributionPeriod.Monthly,
  payFee: true,
});

const submitCreateContribution = () => {
  createContribution(newContribution)
    .then(({ data }) => {
      window.location.href = data.redirectUrl;
    })
    .catch((err) => err);
};

const submitUpdateContribution = () => {
  updateContribution({
    amount: newContribution.amount,
    payFee: newContribution.payFee,
  })
    .then(() => {
      // TODO: to do somthing here? (ask the design team)
    })
    .catch((err) => err);
};

const submitContribution = () => {
  if (isActiveMember.value) {
    submitUpdateContribution();
  } else {
    submitCreateContribution();
  }
};

const contributionContent = reactive<ContributionContent>({
  initialAmount: 5,
  initialPeriod: '',
  minMonthlyAmount: 5,
  periods: [],
  showAbsorbFee: true,
});

const setContributionContent = () => {
  // TODO: currently contribution content is part of
  // join content API.
  fetchJoinContent()
    .then(({ data }) => {
      contributionContent.initialAmount = data.initialAmount;
      contributionContent.initialPeriod = data.initialPeriod;
      contributionContent.minMonthlyAmount = data.minMonthlyAmount;
      contributionContent.periods = data.periods;
      contributionContent.showAbsorbFee = data.showAbsorbFee;
    })
    .catch((err) => err);
};

const cantUpdatePaymentSource = ref(false);

const updatePaymentSource = () => {
  updateBankAccount()
    .then(({ data }) => {
      window.location.href = data.redirectUrl;
    })
    .catch((err) => {
      if (
        err.response?.status === 400 &&
        err.response?.data.code === 'cant-update-contribution'
      ) {
        cantUpdatePaymentSource.value = true;
      }
    });
};

// - TODO: improvement: remove logic duplication between
// contribution page and join page
const fee = computed(() => {
  return (newContribution.amount + 20) / 100;
});

const minAmount = computed(() => {
  const { minMonthlyAmount } = contributionContent;
  return isMonthly.value ? minMonthlyAmount : minMonthlyAmount * 12;
});

const definedAmounts = computed(() => {
  const selectedPeriod = contributionContent.periods.find((period: Periods) => {
    return period.name === newContribution.period;
  });
  return selectedPeriod?.presetAmounts as number[];
});

const changePeriod = (period: ContributionPeriod) => {
  newContribution.period = period;
  // reset the selected amount after period change
  newContribution.amount = definedAmounts.value[0];
};

const isContributionFormInvalid = computed(() => {
  return newContribution.amount < minAmount.value;
});

const isMonthly = computed(() => newContribution.period === 'monthly');
// end of todo

const hasGoCardlessType = computed(
  () => currentContribution.type === ContributionType.GoCardless
);
const isActiveMemberWithGoCardless = computed(
  () => isActiveMember.value && hasGoCardlessType.value
);
const isActiveMember = computed(
  () => currentContribution.membershipStatus === MembershipStatus.Active
);
const isAnnualMember = computed(
  () => currentContribution.period === ContributionPeriod.Annually
);
const hasManualPayment = computed(
  () => currentContribution.type === ContributionType.Manual
);
const isExpiringMember = computed(
  () => currentContribution.membershipStatus === MembershipStatus.Expiring
);
const isExpiredMember = computed(
  () => currentContribution.membershipStatus === MembershipStatus.Expired
);

const contributionButtonText = computed(() => {
  if (hasManualPayment.value) return t('contribution.updatePaymentType');
  else if (isActiveMember.value) return 'Update contribution';
  else if (isExpiringMember.value) return 'Restart contribution';
  return 'Start contribution';
});

const showContributionForm = computed(() => {
  return isAnnualMember.value && !isExpiredMember.value ? false : true;
});

const showCancelContribution = computed(() => {
  return hasGoCardlessType.value || !isActiveMember.value ? false : true;
});

export function useContribution() {
  return {
    newContribution,
    currentContribution,
    setCurrentContribution,
    contributionContent,
    setContributionContent,
    isContributionFormInvalid,
    isMonthly,
    changePeriod,
    minAmount,
    definedAmounts,
    fee,
    submitContribution,
    hasManualPayment,
    contributionButtonText,
    updatePaymentSource,
    isActiveMemberWithGoCardless,
    hasPaymentSource,
    showContributionForm,
    showCancelContribution,
    paymentSource,
    cantUpdatePaymentSource,
  };
}
