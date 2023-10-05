import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-button-template',
  templateUrl: './button-template.component.html',
  styleUrls: ['./button-template.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule]
})
export class ButtonTemplateComponent {

}
