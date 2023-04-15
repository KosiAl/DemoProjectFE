import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';

type messageType = 'Error' | 'Warn' | 'Success';

@Component({
    selector: 'notification',
    templateUrl: './notification.component.html',
})
export class NotificationComponent implements OnInit, OnChanges {
    @Input() shouldOpen: boolean = false;
    @Input() type: any = 'Warn';
    @Input() description: string = '';
    @Input() timeout: number = 1;

    @Output() onClose: EventEmitter<any> = new EventEmitter();

    display: boolean = false;
    timer: any;

    constructor() {}

    ngOnInit(): void {}

    // This part of the code is used to close the notification after a certain amount of time
    ngOnChanges(c: any): void {
        this.display = this.shouldOpen;
        if (this.shouldOpen) {
            let rTime = this.timeout * 1000;
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.onClose.emit(false);
            }, rTime);
        }
    }
}
