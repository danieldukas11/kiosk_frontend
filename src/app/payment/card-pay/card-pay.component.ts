import {Component, OnInit, Output, EventEmitter, Input, OnDestroy, ViewChild, AfterViewInit} from '@angular/core';
import {CardPaymentService} from "../../shared/services/card-payment.service";
import {MessageType} from '../../shared/enums/card-payment-enums'
import {PointGroup, SignaturePad} from 'ngx-signaturepad/signature-pad';

@Component({
    selector: 'app-card-pay',
    templateUrl: './card-pay.component.html',
    styleUrls: ['./card-pay.component.scss']
})
export class CardPayComponent implements OnInit, OnDestroy, AfterViewInit {
    @Input() total;
    @Output() changeRoute = new EventEmitter();
    private _saleData = {
        amount: "0.01",
        emvType: "STANDARD",
        quickchipChecked: false,
        tipAndTaxChecked: false,
        signatureImgData: null,
        tip: {},
        tax: {},
        customTipAmount: "0.00",
    };
    signature = false;
    signImgae: PointGroup[];
    alowSale=true

    @ViewChild("sign", {static: false}) public signaturePad: SignaturePad;

    signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
        'minWidth': 5,
        'canvasWidth': 500,
        'canvasHeight': 300,
        'backgroundColor': 'rgba(255,255,255,1)'
    };

    constructor(private _cardPayment: CardPaymentService) {
        console.log(SignaturePad)
    }

    ngOnInit() {
        this._saleData.amount = this.total
        console.log(this._saleData)
        this._cardPayment.$responseData.subscribe((response) => {

            switch (response) {
                case MessageType.RES_ON_SIGNATURE_REQUIRED:
                    this.signature = true;
                    break;

            }
        })
        this._cardPayment.startSale(this._saleData);

    }

    ngAfterViewInit() {
    }

    drawComplete() {
        this.signImgae = this.signaturePad.toData();
        console.log(this.signImgae)
    }

    clear() {
        this.signaturePad.clear();
        this.signImgae = [];
    }

    continue() {
        this._cardPayment.submitSignature(this.signImgae);
        this.clear();
        this.signature = false;
    }

    goBack() {
        this.changeRoute.emit('tip');
        this._cardPayment.restartWSMiddleware()
    }

    ngOnDestroy() {
    }

}
