import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

import {BehaviorSubject} from "rxjs";
import {MessageType} from '../enums/card-payment-enums'

@Injectable({
    providedIn: 'root'
})
export class CardPaymentService {
    private _ws;
    private  _terminalSettings;
    private _appSettings
    private _deviceConnectionConfig = {
        device: "IDTECH",
        connectionType: "USB",
        inputMethod: "SWIPE_OR_INSERT",
        portName: "ttyACM0",
        emvType: "STANDARD",
    };

    public $responseData = new BehaviorSubject('');

    constructor(private _http: HttpClient) {
        this._ws = new WebSocket('ws://localhost:8080/middleware');
    }

    public getCardPaymentSettings() {
        const usr = localStorage.getItem('user');
        const httpOptions = {
            headers: new HttpHeaders({
                user: usr
            })
        };
        return this._http.get(`${environment.url}card_payment_data`, httpOptions);
    }

    public startSubscriptionToSocket(settings) {
        settings.deviceConnectionConfig=this._deviceConnectionConfig;
        this._ws.onopen = (evt) => {
            //console.log('connected');
        }

        this._ws.onmessage = evt => {
            const message = JSON.parse(evt.data)
            console.log("MESSAGE: ", JSON.stringify(message));
            this.handleMessage(message, settings);
        }

        this._ws.onerror = evt => {
            //console.error("ERROR", evt);
        }

        this._ws.onclose = () => {
            //console.log('disconnected');
        }
    }


    handleMessage = (message, settings) => {
        const type = message.type;
        switch (type) {
            case MessageType.RES_ON_WS_INIT_REQUIRED:
                this.initWSMiddleware();

                break;
            case MessageType.RES_ON_WS_INIT:
                this.initWithConfiguration(settings.terminal_id, settings.secret)
                break;
            case MessageType.RES_ON_SETTINGS_RETRIEVED:
                this._appSettings=message.data.settings
                const settingsObj = {...message.data.settings};
                let taxList = [];
                let tipList = [];
                if (settingsObj.taxList != null && settingsObj.tipList != null) {
                    settingsObj.taxList.forEach(tax => {
                        taxList.push({
                            name: tax.name,
                            percentage: tax.percentage,
                            uid: tax.uid,
                        });
                    });
                    settingsObj.tipList.forEach(tip => {
                        tipList.push({
                            uid: tip.uid,
                            tipType: tip.tipType,
                            percentage: tip.percentage,
                            amount: tip.amount,
                        });
                    });
                }

                const terminalSettings = {
                    features: settingsObj.features,
                    merchantDetails: settingsObj.merchantDetails,
                    taxList,
                    tipList,
                };
                this._terminalSettings=terminalSettings;
                this.getSupportedDevices();
                break;
            case MessageType.RES_ON_SUPPORTED_DEVICES_RETRIEVED:
                //console.log("RES_ON_SUPPORTED_DEVICES_RETRIEVED: " + JSON.stringify(message.data));
                this.connectDevice(settings.deviceConnectionConfig)
                break;
            case MessageType.RES_ON_DEVICE_CONNECTED:
                //console.log("RES_ON_DEVICE_CONNECTED: " + JSON.stringify(message.data.deviceInfo));
               this.getIsDelayedAuthEnabled();
               this.getIsPollingEnabled();
                this.getDeviceInfo();
                break
            case MessageType.RES_ON_GET_DELAYED_AUTH_ENABLED:
                console.log("RES_ON_GET_DELAYED_AUTH_ENABLED: " );
                break;
            case MessageType.RES_ON_GET_POLLING_ENABLED:
                console.log("RES_ON_GET_POLLING_ENABLED: ");

                break;
            case MessageType.RES_ON_DEVICE_INFO_RETURNED:
                this.$responseData.next(MessageType.RES_ON_DEVICE_INFO_RETURNED)
                console.log("RES_ON_DEVICE_INFO_RETURNED - ")

                break;
            case MessageType.RES_ON_MESSAGE:
                //console.log("RES_ON_MESSAGE: " + JSON.stringify(message.data.message));
                if(message.data.message==="REMOVE_CARD"){
                    //this.disconnectDevice()
                }
                break;
            case MessageType.RES_ON_SIGNATURE_REQUIRED:
                //console.log("RES_ON_SIGNATURE_REQUIRED");
                this.$responseData.next(MessageType.RES_ON_SIGNATURE_REQUIRED)
                break;



            case MessageType.RES_ON_WS_RESTART:
                 //console.log("RES_ON_WS_INIT: " + message.description);


                 break;

             case MessageType.RES_ON_SET_MODE:
                 //console.log("RES_ON_SET_MODE: " +  JSON.stringify(message.data));

                 break;
             case MessageType.RES_ON_SET_LOG_LEVEL:
                 //console.log("RES_ON_SET_LOG_LEVEL: " + JSON.stringify(message.data));

                 break;

             case MessageType.RES_ON_SALE_RESPONSE:
                 //console.log("RES_ON_SALE_RESPONSE: " + JSON.stringify(message.data.saleResponse));


                 break;
             case MessageType.RES_ON_REFUND_RESPONSE:
                 //console.log("RES_ON_REFUND_RESPONSE: " + JSON.stringify(message.data.refundResponse));



                 break;
             case MessageType.RES_ON_TRANSACTION_LIST_RESPONSE:
                 //console.log("RES_ON_TRANSACTION_LIST_RESPONSE: " + JSON.stringify(message.data.transactions));

                 const normalizedTransactionData = {};

                 if (message.data != null && message.data.transactions != null) {
                     message.data.transactions.forEach(data => {
                         const listDetails = {
                             cardNumber: data.cardNumber,
                             cardType: data.cardType,
                             amount: data.amount,
                             transactionDate: data.transactionDate,
                             transactionState: data.transactionState,
                         };

                         normalizedTransactionData[data.orderId] = {
                             listDetails,
                             viewDetails: { ...data },
                         };
                     });
                 }



                 break;
             case MessageType.RES_ON_REQUEST_SET_AMOUNT:
                 //console.log("RES_ON_REQUEST_SET_AMOUNT: " + JSON.stringify(message.data.sale));

                 const sale = message.data.sale;

                 if (sale != null) {
                     if (sale.delayedAuthEnabled) {

                     } else {

                     }
                 }


                 break;
             case MessageType.RES_ON_REQUEST_CLOSE_BATCH_RESPONSE:
                 //console.log("RES_ON_REQUEST_CLOSE_BATCH_RESPONSE");



                 break;
             case MessageType.RES_ON_CALCULATED_AMOUNT_RESPONSE:
                 //console.log("RES_ON_CALCULATED_AMOUNT_RESPONSE: " + JSON.stringify(message.data));


                 break;
             case MessageType.RES_ON_SELECT_APPLICATION:
                 //console.log("RES_ON_SELECT_APPLICATION");

                 this.submitApplication(0);

                 break;
             case MessageType.RES_ON_SIGNATURE_REQUIRED:
                 console.log("RES_ON_SIGNATURE_REQUIRED");



                 break;
             case MessageType.RES_ON_TERMINAL_HEALTH_LISTENER_STARTED:
                 //console.log("RES_ON_TERMINAL_HEALTH_LISTENER_STARTED");
                 break;
             case MessageType.RES_ON_TERMINAL_HEALTH_LISTENER_STOPPED:
                 //console.log("RES_ON_TERMINAL_HEALTH_LISTENER_STOPPED");
                 break;
             case MessageType.RES_ON_SET_OFFLINE_MODE_ENABLED:
                 //console.log("RES_ON_SET_OFFLINE_MODE_ENABLED - Enabled: " + message.data.enabled);
                 break;
             case MessageType.RES_ON_OFFLINE_SALE_REQUEST:
                 //console.log("RES_ON_OFFLINE_SALE_REQUEST - " + JSON.stringify(message.data));


                 break;

             case MessageType.RES_ON_WS_ERROR: // WEBSOCKET ERROR
                 //console.log("RES_ON_WS_ERROR");


                 if (message.messageTypeSource === MessageType.REQ_SET_POLLING_ENABLED || message.messageTypeSource === MessageType.REQ_SET_DELAYED_AUTH_ENABLED) {
                     this.getIsDelayedAuthEnabled();
                     this.getIsPollingEnabled();
                 }

                 break;
             case MessageType.RES_ON_DEVICE_ERROR:
                 //console.log("RES_ON_DEVICE_ERROR");


                 break;
             case MessageType.RES_ON_TERMINAL_HEALTH_LISTENER_ERROR:
                 //console.log("RES_ON_TERMINAL_HEALTH_LISTENER_ERROR");

                 break;
             case MessageType.RES_ON_ERROR: // GoChip SDK On Error
                 //console.log("RES_ON_ERROR");


                 if (message.messageTypeSource === MessageType.REQ_SET_POLLING_ENABLED || message.messageTypeSource === MessageType.REQ_SET_DELAYED_AUTH_ENABLED) {
                     this.getIsDelayedAuthEnabled();
                     this.getIsPollingEnabled();
                 }


                 break;
        }
    }


    initWSMiddleware = () => {
        const msgObj = {
            type: MessageType.REQ_WS_INIT,
            data: {
                mode: "TEST",
                logLevel: "LEVEL_FULL"
            }
        };

        this.sendMessage(msgObj);
    }

    /**
     * release resources and reinitialize websocket server
     */
    restartWSMiddleware = () => {
        const msgObj = {
            type: MessageType.REQ_WS_RESTART
        };

        this.sendMessage(msgObj);
    }

    setLogLevel = (logLevel) => {
        const msgObj = {
            type: MessageType.REQ_SET_LOG_LEVEL,
            data: {
                logLevel
            }
        };

        this.sendMessage(msgObj);
    }

    setMode = (mode) => {
        const msgObj = {
            type: MessageType.REQ_SET_MODE,
            data: {
                mode
            }
        };

        this.sendMessage(msgObj);
    }

    initWithConfiguration = ( terminalId, secret ) => {
        const msgObj = {
            type: MessageType.REQ_INIT_WITH_CONFIGURATION,
            data: {
                terminalId,
                secret
            }
        };

        this.sendMessage(msgObj);
    }

    retrieveSettings = () => {
        const msgObj = {
            type: MessageType.REQ_RETRIEVE_SETTINGS,
        };

        this.sendMessage(msgObj);
    }

    connectDevice = (data) => {
        const msgObj = {
            type: MessageType.REQ_INIT_DEVICE,
            data,
        };

        this.sendMessage(msgObj);
    }


    disconnectDevice = () => {
        const msgObj = {
            type: MessageType.REQ_DISCONNECT_DEVICE
        };

        this.sendMessage(msgObj);
    }

    startSale = (sale) => {
        if (sale.amount === undefined || sale.amount === "0.00" || sale.amount === "") {
            return false;
        }
console.log('sale')
        const msgObj = {
            type: MessageType.REQ_PROCESS_SALE,
            data: { ...sale }
        };

        this.sendMessage(msgObj);

        return true;
    }

    calculateAmount = ({ amount, tip, tax, customTipAmount }) => {
        const msgObj = {
            type: MessageType.REQ_GET_CALCULATED_AMOUNT,
            data: {
                amount,
                tip,
                tax,
                customTipAmount,
            }
        };

        this.sendMessage(msgObj);
    }

    startUnreferencedRefund = (amount) => {
        if (amount === undefined || amount === "0.00" || amount === "") {
            return false;
        }

        const msgObj = {
            type: MessageType.REQ_PROCESS_UNREFERENCED_REFUND,
            data: {
                amount,
                cardCvv: "123",
                cardNumber: "4444333322221111",
                cardHolderName: "test",
                expiryDate: "1224",
                reason: "reason",
            },
        };

        this.sendMessage(msgObj);

        return true;
    }

    startRefund = ({ uniqueRef, amount, reason = "reason" }) => {
        const msgObj = {
            type: MessageType.REQ_PROCESS_REFUND,
            data: {
                uniqueRef,
                amount: amount,
                reason,
            }
        };

        this.sendMessage(msgObj);
    }

    closeTransactionsBatch = () => {
        const msgObj = {
            type: MessageType.REQ_CLOSE_TRANSACTIONS_BATCH,
        };

        this.sendMessage(msgObj);
    }


    cancelTransaction = () => {
        const msgObj = {
            type: MessageType.REQ_CANCEL_TRANSACTION,
        };

        this.sendMessage(msgObj);
    }

    getTransactions = (filterObj) => {
        const msgObj = {
            type: MessageType.REQ_GET_TRANSACTIONS,
            data: { ...filterObj }
        };

        this.sendMessage(msgObj);
    }

    submitApplication = (index = 0) => {
        const msgObj = {
            type: MessageType.REQ_SUBMIT_APPLICATION,
            data: {
                index
            }
        };

        this.sendMessage(msgObj);
    }

    submitSignature = (pointsArr) => {
        if (pointsArr.length !== 0) {
            const msgObj = {
                type: MessageType.REQ_SUBMIT_SIGNATURE,
                data: {
                    signatureData: pointsArr
                }
            };

            this.sendMessage(msgObj);
        }
    }

    submitAmount = ({ sale, confirmation = true }) => {
        const msgObj = {
            type: MessageType.REQ_SUBMIT_AMOUNT,
            data: {
                sale,
                confirmation
            }
        };

        this.sendMessage(msgObj);
    }

    setTerminalHealthListenerEnabled = (enabled) => {
        const msgObj = {
            type: MessageType.REQ_SET_TERMINAL_HEALTH_LISTENER_ENABLED,
            data: {
                enabled
            }
        };

        this.sendMessage(msgObj);
    }

    setOfflineModeEnabled = (enabled) => {
        const msgObj = {
            type: MessageType.REQ_SET_OFFLINE_MODE_ENABLED,
            data: {
                enabled
            }
        };

        this.sendMessage(msgObj);
    }

    getSupportedDevices = () => {
        const msgObj = {
            type: MessageType.REQ_LIST_SUPPORTED_DEVICES
        };

        this.sendMessage(msgObj);
    }

    getIsDelayedAuthEnabled = () => {
        const msgObj = {
            type: MessageType.REQ_GET_DELAYED_AUTH_ENABLED
        };

        this.sendMessage(msgObj);
    }

    getIsPollingEnabled = () => {
        const msgObj = {
            type: MessageType.REQ_GET_POLLING_ENABLED
        };

        this.sendMessage(msgObj);
    }

    setPollingEnabled = ({ enabled, initialAmount }) => {
        const msgObj = {
            type: MessageType.REQ_SET_POLLING_ENABLED,
            data: {
                enabled,
                initialAmount
            }
        };

        this.sendMessage(msgObj);
    }

    setDelayedAuthEnabled = ({ enabled, initialAmount }) => {
        const msgObj = {
            type: MessageType.REQ_SET_DELAYED_AUTH_ENABLED,
            data: {
                enabled,
                initialAmount
            }
        };

        this.sendMessage(msgObj);
    }

    getDeviceInfo = () => {
        const msgObj = {
            type: MessageType.REQ_GET_DEVICE_INFO,
        };

        this.sendMessage(msgObj);
    }



    sendMessage = (obj) => {
        if (this._ws.readyState == 1) {
            const jsonStrToSend = JSON.stringify(obj);
            //console.log("JSON Request: \n" + jsonStrToSend);
            this._ws.send(jsonStrToSend);
        } else {
            console.error("Websocket not ready.");
        }
    }

}



