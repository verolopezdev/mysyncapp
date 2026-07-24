import { IonButton } from "@ionic/react";
import { authService } from "../services/AuthService";

export function PremiumButton() {
  async function upgrade() {
    try {
      await authService.login();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <IonButton
      expand="block"
      color="warning"
      onClick={upgrade}
    >
      Upgrade to Premium
    </IonButton>
  );
}