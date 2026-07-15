import {format} from "date-fns";
import ManageSubscriptionButton from "@/components/shared/buttons/ManageSubscriptionButton";
import {TSubscription} from "@/types/types";

export default function SubscriptionMessage({ userSubscription }: { userSubscription: TSubscription }) {
    return (
        <div className="flex items-center gap-px">
            <p>
                You are currently on the <span className="ml-1 font-medium">{`${userSubscription.plan?.name} ($${userSubscription.plan?.price}/mo)`}</span>. Your next renewal date is
                <span className="ml-1 font-medium">{format(userSubscription?.currentPeriodEnd, "MMMM dd, yyyy")}</span>.
            </p>
            <ManageSubscriptionButton>
                Manage Subscription
            </ManageSubscriptionButton>
        </div>
    );
}