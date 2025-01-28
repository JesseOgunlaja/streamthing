import { subscriptionPlans } from "@/constants/plans";
import styles from "@/styles/protected/settings/page.module.css";

const BillingPlans = () => {
  return (
    <div className={styles["upgrade-plan"]}>
      <p>Upgrade plan</p>
      <table id={styles.table}>
        <thead>
          <tr>
            <th>Empty</th>
            <th>Max Connections</th>
            <th>Max Messages</th>
            <th>Max Servers</th>
            <th>Monthly Price</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(subscriptionPlans).map((plan) => (
            <tr key={plan.title}>
              <th>{plan.title}</th>
              <td>{plan.limits.connections.toLocaleString()}</td>
              <td>{plan.limits.messages.toLocaleString()}</td>
              <td>{plan.limits.servers}</td>
              <td>
                <div>
                  £{plan.monthlyPrice} <span>Upgrade</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BillingPlans;
