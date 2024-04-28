import { Component, ViewChild, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms';
import { AlertInput, IonicModule } from '@ionic/angular';
import { IonModal, AlertController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import {MercadoService, Market, newMarket} from '../services/mercado.service';
import { addIcons } from 'ionicons';
import { trashOutline, addOutline, createOutline} from 'ionicons/icons';
import { marketLocals } from '../../interfaces/localidades.interfaces'



@Component({
  selector: 'app-mercado',
  templateUrl: './mercado.page.html',
  styleUrls: ['./mercado.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule ]
})
export class MercadoPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  Markets: Market[] = [];
  MarketLocals: any[] = [];
  alertButtons = ['Ok'];
  public alertButtonsD = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
      },
    },
  ];

  // edit
  messageEdit: string = '';
  



  
  messageError: string = '';
  messageErrorF: string = '';
  messageAdd: string = '';
  messageDel: string = '';
  StatusAdd: string = '';
  StatusDel: string = '';

  isModalOpen = false;
  isModalOpenN = false;
 
  private readonly _formBuilder = inject(FormBuilder);

    FormGroup = this._formBuilder.nonNullable.group({
      nombre_mercado: ['', Validators.required],
      direccion: ['', Validators.required],
      latitud: ['', Validators.required],
      longitud: ['', Validators.required]
  });

  

  constructor( private MarketS: MercadoService, private alertController: AlertController) {
    addIcons({trashOutline, addOutline, createOutline});
   }

  ngOnInit() {
    this.getMarket();
    
  }



  alertInputs: AlertInput[] = [
    {
      name: 'nombre_mercado',
      type: 'text',
      placeholder: 'Nombre del mercado',
    },
    {
      name: 'direccion',
      type: 'text',
      placeholder: 'Dirección',
    },
    {
      name: 'latitud',
      type: 'text',
      placeholder: 'Latitud',
    },
    {
      name: 'longitud',
      type: 'text',
      placeholder: 'Longitud',
    },
  ];

  setResult(ev: CustomEvent<OverlayEventDetail>) {
    console.log(`Dismissed with role: ${ev.detail.role}`);

  }

  //abrir modal delete
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  cancel() {
    this.isModalOpen = false;
  }


  getMarket() {
    this.MarketS.getAll().then((response) => {
      // console.log(response);
      this.Markets = response.data;
    });
  }

  // abrir modal nuevo
  newMArket(isOpen: boolean) {
    this.isModalOpenN = isOpen;
  }
  
  // setOpenN(isOpen: boolean) {
  //   this.isModalOpenN = isOpen;
  // }
  cancelN() {
    this.isModalOpenN = false;
    console.log('cancelar');
  }



  guardar() {
    // sil el FormGroup es invalido mo cerramos el modal
    if (this.FormGroup.invalid) {
      this.messageErrorF = 'Formulario incompleto';
      return;
    }

    const data = this.FormGroup.value;
    // console.log(data); 
    this.MarketS.newMarket(data).then((response) => {
      console.log(response);
      this.StatusAdd = response.status;
      this.messageAdd = response.message;
      this.getMarket();
    });
    //cerramos el modal
    this.isModalOpenN = false;

    // Limpiamos el formulario
    this.FormGroup.reset();

  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    console.log('will dismiss with', ev.detail);
    if (ev.detail.role === 'confirm') {
      this.messageError = `Hello, ${ev.detail.data}!`;
    }

    // limpiar las variables de error
    this.messageError = '';
    this.messageErrorF = '';
    this.messageAdd = '';
    this.messageDel = '';
    this.StatusAdd = '';
    this.StatusDel = '';
  }

 async showAlert(id:string, nombre_mercado: string) {
   this.messageDel = '';
    const alert = await this.alertController.create({
      header: 'Eliminar',
      message: `¿Estás seguro que deseas eliminar el: ${nombre_mercado}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');

          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            
            console.log('Eliminar', id);
            // Agregar aquí la lógica para eliminar el elemento
            this.MarketS.deleteMarket(id).then((response) => {
              console.log(response);
              this.StatusDel = response.status;
              this.messageDel = response.message;
              this.getMarket();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async showAlertEdit(id: string, nombre_mercado: string) {
    // get market by id
    this.MarketS.getMarket(id).then((response) => {
      console.log(response);
      this.alertInputs[0].value = response.nombre_mercado;
      this.alertInputs[1].value = response.direccion;
      this.alertInputs[2].value = response.latitud;
      this.alertInputs[3].value = response.longitud;

    });


    this.messageEdit = '';
    const alert = await this.alertController.create({
      header: `Editar el ${nombre_mercado}`,
      // message: `¿Estás seguro que deseas editar ${nombre_mercado}?`,
      inputs: this.alertInputs,
      cssClass: 'alert-edit',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Edición cancelada');
          }
        },
        {
          text: 'Actualizar',
          handler: (data) => {
            console.log('Datos editados:', data);
            console.log('Datos editados:', id);
            // Aquí puedes agregar la lógica para guardar los datos editados
            this.MarketS.updateMarket(data, id).then((response) => {
              console.log(response);
              this.messageEdit = response.message;
              this.getMarket();
            });
          }
        }
      ]
    });
    await alert.present();
  }




  // Ver Locales
  verLocales(isOpen: boolean, id: string) {
    this.isModalOpen = isOpen;
  
    console.log('Ver locales del mercado:', id);
    console.log('Ver locales del mercado:', isOpen);
    
    this.MarketS.getMarketLocals(id).then((response) => {
      console.log(response);
      this.MarketLocals = response.data;
      console.log(this.MarketLocals);
    }
    );

  }



  onSubmit(): void {
    console.log(this.FormGroup.value);
  }


  // getter & setter
  get nombre_mercadoField(): FormControl<string> {
    return this.FormGroup.controls.nombre_mercado;
  }

  get direccionField(): FormControl<string> {
    return this.FormGroup.controls.direccion;
  }

  get latitudField(): FormControl<string> {
    return this.FormGroup.controls.latitud;
  }

  get longitudField(): FormControl<string> {
    return this.FormGroup.controls.longitud;
  }


}
