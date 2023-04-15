import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    OnChanges,
} from '@angular/core';

@Component({
    selector: 'conformation',
    templateUrl: './warning.component.html',
})
export class WarningComponent implements OnInit, OnChanges {
    @Input() type: string = '';
    @Input() title: string = '';
    @Input() description: string = '';
    @Input() confirm: string = '';
    @Input() cancel: string = '';
    @Input() shouldOpen: boolean = false;

    @Output() onClose: EventEmitter<any> = new EventEmitter();

    open: boolean = false;

    constructor() {}

    ngOnInit(): void {}

    ngOnChanges(): void {
        this.open = this.shouldOpen;
    }

    accept() {
        this.onClose.emit(true);
        this.open = false;
    }

    reject() {
        this.onClose.emit(false);
        this.open = false;
    }
}
