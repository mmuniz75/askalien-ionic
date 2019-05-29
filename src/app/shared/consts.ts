import { AlertController } from '@ionic/angular';

export const SERVER_CONF = 'https://raw.githubusercontent.com/mmuniz75/askalien-android/master/server.properties';

export const presentAlert = async (alertController: AlertController, header: string, message: string) => {
    const alert = await alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();

  };

export const presentDataError = async (alertController: AlertController) => {
    presentAlert(alertController, 'Failed to retriev data', 'Please try again later');

};
