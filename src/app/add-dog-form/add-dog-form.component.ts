import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { Dog } from '../dog';
import config from '../services/environment.json';
import {RegisterResponse} from '../registration/registration.interfaces';
import { Router } from '@angular/router';
import { PictureUploaderComponent } from '../picture-uploader/picture-uploader.component';

@Component({
  selector: 'app-add-dog-form',
  templateUrl: './add-dog-form.component.html',
  styleUrls: ['./add-dog-form.component.scss'],
})
export class AddDogFormComponent implements OnInit {
  // TODO: es muss noch abgefragt werden, ob der User einen Hund mit dem gegebenen Namen schon hat.
  // TODO: Wohin soll verwiesen werden, wenn hund hinzugefügt wurde.
    dogName = Dog.dogName;
    dogBirthDate = Dog.dogBirthDate;
    dogSize = Dog.dogSize;
    neutered = Dog.neutered;
    dogDescription = Dog.dogDescription;
    dogRace = Dog.dogRace;
    private dogGender;
    private response: (null | RegisterResponse);
 /*   dogData = new FormGroup({
        dogName: new FormControl('',
            [Validators.required, Validators.pattern('(?=(?:^\\w))([A-Za-z0-9._, -]+)(?<=[^ ])$'),
            Validators.minLength(1), Validators.maxLength(50)]),
        dogRace: new FormControl('', [Validators.required]),
        dogSize: new FormControl('', [Validators.required]),
        dogDescription: new FormControl('', [Validators.maxLength(400)]),
        dogGender: new FormControl('', [Validators.required])
    });*/
        test: any;
    genders: any[];
      races: any[];
    private dogFormGroup: FormGroup;
    constructor(private router: Router) {
      /*  this.dogFormGroup = new FormGroup({
            name: new FormControl(),
            gender: new FormControl(),
            birthdate: new FormControl(),
            size: new FormControl(),
            race: new FormControl()
        });*/
    }

    picUpload() {
    }

  ngOnInit() {
      this.genders = ['männlich', 'weiblich'];
      this.races = ['Terrier', 'Schäferhund', 'Collie', 'Border-Collie' ];
  }

    clearInputs(form: NgForm) {
        form.resetForm();
    }

    async onSubmit() {

        const { dogName, dogBirthDate, dogGender, dogSize, neutered, dogDescription, dogRace } = this;

        const dog = {
            dogName,
            dogBirthDate,
            dogGender,
            dogSize,
            neutered,
            dogDescription,
            dogRace
        };

        try {
            const response = await fetch(config.serverBaseUrl + 'addDog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(dog)
            });

            const responseData: RegisterResponse = await response.json();
            this.handleResponse(responseData);
        } catch (e) {
            this.handleResponse({ success: false, message: 'The server did not respond' });
        }
    }

    handleResponse(response: RegisterResponse) {
        this.response = response;

        if (response.success) {
            console.log(response);
            // this.router.navigate(['/main']);
        }
    }

}


