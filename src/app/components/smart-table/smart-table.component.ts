import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClarityModule, ClrDatagridModule } from '@clr/angular';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { ClarityIcons, downloadIcon, plusIcon, timesIcon } from '@cds/core/icon';
import { toCamelCase } from 'src/app/common/stringUtils';
import { ItemType } from 'src/app/common/menuType';

ClarityIcons.addIcons(downloadIcon, timesIcon, plusIcon);

@Component({
  selector: 'app-smart-table',
  standalone: true,
  imports: [
    ClarityModule,
    ClrDatagridModule
],
  templateUrl: './smart-table.component.html',
  styleUrl: './smart-table.component.css'
})
export class SmartTableComponent {
  @Input() source: any[] = [];
  @Input() itemType: ItemType = ItemType.Device;
  @Input() columns: string[] = [];
  @Input() placeholder: string = 'We couldn\'t find any data!';
  @Input() onDownload: ((selected: any[]) => void) | undefined;
  @Input() onDelete: ((selected: any[]) => void) | undefined;
  @Input() onAdd: (() => void) | undefined;
  @Output() onRowSelect: EventEmitter<any> = new EventEmitter<any>();
  @Input() deleteText: string = 'Delete';
  @Input() downloadText: string = 'Download';
  @Input() addText: string = 'Add';
  @Output() onUpdate: EventEmitter<any> = new EventEmitter();

  selected: any[] = [];
  detail: any = {};

  onSelect(id: string) {
    console.log('Selected', id);
  }

  userRowSelect = (selected: any) => {
    if (this.onRowSelect) {
      this.onRowSelect.emit(selected);
    }
  }

  toID(name: string) {
    return toCamelCase(name);
  }
}
