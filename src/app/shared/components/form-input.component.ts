import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'form-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-input.component.html',
})
export class FormInputComponent {
  @Input() Name!: string;
  @Input() Label?: string;
  @Input() Items?: string[]

  @Input() Type!: 'password' | 'number' | 'text' | 'email' | 'date' | 'select'
  form!: FormGroup;
  get errors() {
    return this.control.errors;
  }
  get control() {
    return this.form.get(this.Name)!;
  }

  constructor(private rootFormGroup: FormGroupDirective) { }
  ngOnInit() {
    this.form = this.rootFormGroup.control;
  }
}
