import { SharedModule } from '../SharedModule/shared.module';
import { NgModule } from '@angular/core';
import { NotificationComponent } from '../Dialogs/notification/notification.component';
import { WarningComponent } from '../Dialogs/warning/warning.component';

@NgModule({
    declarations: [WarningComponent, NotificationComponent],
    imports: [SharedModule],
    exports: [WarningComponent, NotificationComponent],
})
export class DialogModule {}
