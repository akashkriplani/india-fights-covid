import { Component, OnInit } from '@angular/core';
import { SocialMediaLinks } from '../../constants/Constants';

@Component({
  selector: 'ifc-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public currentYear: number;
  public links: { [key: string]: string };

  ngOnInit(): void {
    this.links = SocialMediaLinks;
    this.currentYear = new Date().getFullYear();
  }
}
