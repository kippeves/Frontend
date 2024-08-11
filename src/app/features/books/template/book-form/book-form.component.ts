import { CommonModule } from "@angular/common";
import { Component, EventEmitter, HostListener, inject, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { FormInputComponent } from "../../../../shared/components/form-input.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Book } from "../../interfaces/book";
import { Observable } from "rxjs";
import { BookService } from "../../book.service";
import { Router, RouterLink, RouterModule } from "@angular/router";

@Component({
    selector: 'book-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormInputComponent, FontAwesomeModule, RouterLink, RouterModule],
    templateUrl: './book-form.component.html',
})

export class BookFormComponent {
    constructor(private formBuilder: FormBuilder, private router: Router) { }
    faArrowLeft = faArrowLeft

    Cancel() {
        this.onCancel.emit();
    }


    @Input() formTitle?: string
    Types = ["Bunden", "Pocket"]
    Form?: FormGroup
    @Input() previousValues!: {}

    @Output() onSubmit = new EventEmitter<Book>();
    @Output() onCancel = new EventEmitter();

    Submit() {
        if (this.hasChanges()) {
            this.onSubmit.emit(this.Form?.value)
        }
    }

    hasChanges() {
        return Object.entries(this.changedValues()).length > 0
    }

    @HostListener('window:beforeunload')
    canDeactivate(): Observable<boolean> | boolean {
        return !this.hasChanges();
    }

    changedValues() {
        const changedValues: { [id: string]: object } = {};
        for (const control in this.Form?.controls) {
            const field = this.Form.get(control);
            if (field?.dirty) {
                var object = JSON.parse(JSON.stringify(this.previousValues))
                if (object[control] != field.value) {
                    changedValues![control] = field.value
                }
            }
        }
        return changedValues;
    }
    setPreviousValues() {
        this.Form?.reset()
    }

    ngOnInit() {
        this.Form = this.formBuilder.group(this.previousValues);
    }
}