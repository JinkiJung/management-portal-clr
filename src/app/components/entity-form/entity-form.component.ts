import { Component, Input, ViewChild } from '@angular/core';
import { SharedModule } from '../../common/shared/shared.module';
import { ClrForm, ClrFormsModule } from '@clr/angular';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ColumnForResource } from 'src/app/common/columnForMenu';
import { ResourceType } from 'src/app/common/menuType';
import { filterUndefinedAttributes } from 'src/app/common/filterObject';
import { JsonPipe } from '@angular/common';
import { mrnRegex } from 'src/app/common/mrnRegex';

@Component({
  selector: 'app-entity-form',
  standalone: true,
  imports: [
    SharedModule,
    ClrFormsModule,
    FormsModule,
    ReactiveFormsModule,
    JsonPipe
],
  templateUrl: './entity-form.component.html',
  styleUrl: './entity-form.component.css'
})
export class EntityFormComponent {
  /**
   * menu type of an active page
   */
  @Input() menuType: ResourceType = ResourceType.Device;
  /**
   * a boolean indicating its use for creating entity
   */
  @Input() isForNew: boolean = false;

  /**
   * an mrn of organization owning the chosen entity
   */
  @Input() mrnPrefix: string = 'urn:mrn:';

  @ViewChild(ClrForm, { static: true }) clrForm: ClrForm | undefined;
  
  viewContext = 'detail';

  entityForm: FormGroup = new FormGroup({});
  columnForMenu: {[key: string]: any} = {};
  isEditing = false;
  shortId = '';
  entity: any = {mrn: this.mrnPrefix};

  contextForAttributes = 'detail';

  constructor(private formBuilder: FormBuilder) {
    this.setForm();
    // initialize the form values
    this.entityForm.patchValue(this.entity);
  }

  submit = () => {
    // Filter attributes with undefined values
    console.log(this.entityForm.valid);
    if (!this.entityForm.valid) {
      this.entityForm.markAllAsTouched();
      this.clrForm?.markAsTouched();
    }
    const filteredAttributes = filterUndefinedAttributes(this.entity);
    console.log(filteredAttributes);
  }
  resetForm = () => {
    this.setForm();
  }

  ngOnInit(): void {
    this.shortId = "Hello";
    
  }

  onMrnKeyDown(event: Event) {
    const newValue = (event.target as HTMLInputElement).value;
    if (newValue.includes(this.mrnPrefix)) {
      this.entity['mrn'] = newValue;
    } else {
      (event.target as HTMLInputElement).value = this.mrnPrefix;
    }
  }

  onMrnChange(value: string) {
    if (!value.startsWith(this.mrnPrefix)) {
      this.entity.mrn = this.mrnPrefix;
    } else {
      this.entity.mrn = value;
    }
  }

  /**
   * creating a form taking given menu type account into
   */
  setForm = () => {
    let formElements: {[key: string]: any} = {};
    Object.entries(ColumnForResource[this.menuType.toString()]).map(([key, value]) => {
      if (!value.visibleFrom)
        return;
      if (value.visibleFrom && !value.visibleFrom.includes(this.contextForAttributes))
        return;
      if (key === 'mrn') {
        const mrnReg: RegExp = new RegExp(mrnRegex());
        formElements[key] = ['', [Validators.required, Validators.pattern(mrnReg)]];
      } else {
        formElements[key] = ['', value.required ? Validators.required : undefined];
      }
      this.columnForMenu[key] = value;
      /*
      if (Array.isArray((value as any)['visibleFrom']) && // array type checking with type assertion
        (value as any)['visibleFrom'].includes(this.contextForAttributes) && // context filtering, either detail or list
        (!this.isEditing || (this.isForNew && (value as any)['notShowOnEdit'] !== true)))
        this.columnForMenu[key] = value;
        */
    });
    this.entityForm = this.formBuilder.group(formElements);
  }

  /**
   * a function returning whether the resource type requires short ID or not
   * @param resourceType type of resource
   * @returns whether the resource type requires short ID or not
   */
  needShortId = (resourceType: string) => {
    return this.getShortIdType(resourceType) !== undefined;
  }

  /**
   * a function fetching its short ID
   * @param resourceType type of resource
   * @returns whether the resource type requires short ID or not
   */
  getShortIdType = (resourceType: string) => {
    return this.columnForMenu[resourceType] ? this.columnForMenu[resourceType].shortIdType : undefined;
  }

  addShortIdToMrn = (field: string, shortId: string) => {
    /*
    const mrn = this.mrnHelperService.mrnMask( this.getShortIdType(field), this.orgShortId) + shortId;
    this.formGroup.get(field).setValue(mrn);
    if (field === 'orgMrn') {
      this.orgShortId = !this.orgShortId ? this.formGroup.get('orgMrn').value.split(":").pop():
        this.orgShortId;
      if (this.formGroup.get('adminMrn')) {
        const adminShortId = this.formGroup.get('adminMrn').value.split(":").pop();
        this.formGroup.get('adminMrn').setValue(this.mrnHelperService.mrnMaskForUserOfOrg(this.orgShortId) + adminShortId);
      }
    }
    */
  }

  sortColumnForMenu = (a: any, b: any) => {
    return a.order > b.order ? -1 : 1;
  }
}
