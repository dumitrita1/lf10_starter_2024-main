import { Component, Input, OnInit } from '@angular/core';
import { Employee } from "../dummy-model/EmployeeDummy";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {Router} from "@angular/router";

interface ColorConfig {
  saturationRange: [number, number];
  lightnessRange: [number, number];
}

interface ColorSet {
  background: string;
  button: string;
  text: string;
}

@Component({
  selector: 'app-employee-card',
  standalone: true,
  imports: [
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './employee-card.component.html',
  styleUrl: './employee-card.component.css'
})
export class EmployeeCardComponent implements OnInit {
  @Input() employee: Employee = {
    firstName: "Name",
    lastName: "Müller",
    city: "Bremen",
    phone: "012345678",
    street: "Todessternstaße",
    postcode: "12345",
    id: 1
  };

  dummyImages = [
    "assets/dummyimages/profile1.png",
    "assets/dummyimages/profile2.png",
    "assets/dummyimages/profile3.png",
  ]

  constructor(private router: Router) {
    this.router = router;
  }

  employeeProfileImage(): string {
    return this.dummyImages[Math.floor(Math.random() * this.dummyImages.length)];
  }


  openEmployeeCard() {
    console.log('Open employee card');
    // navigate to employee-details
    this.router.navigate(['/employee', this.employee.id]);
  }

  colors: ColorSet = {
    background: '#ffffff',
    button: '#ffffff',
    text: '#000000'
  };

  private static readonly colorConfigs: Record<string, ColorConfig> = {
    default: {
      saturationRange: [15, 30],
      lightnessRange: [85, 95]
    }
  };

  ngOnInit(): void {
    const hue = this.randomInRange(0, 360);
    const config = EmployeeCardComponent.colorConfigs['default'];

    // Generate background color
    const bgSaturation = this.randomInRange(
      config.saturationRange[0],
      config.saturationRange[1]
    );
    const bgLightness = this.randomInRange(
      config.lightnessRange[0],
      config.lightnessRange[1]
    );

    // Generate button color with same hue but darker
    const buttonLightness = bgLightness - 15; // Make button darker
    const buttonSaturation = bgSaturation + 5; // Slightly more saturated

    this.colors = {
      background: this.hslToHex(hue, bgSaturation, bgLightness),
      button: this.hslToHex(hue, buttonSaturation, buttonLightness),
      text: this.getContrastTextColor(this.hslToHex(hue, bgSaturation, bgLightness))
    };
  }

  private hslToHex(h: number, s: number, l: number): string {
    const hDecimal = h / 360;
    const sDecimal = s / 100;
    const lDecimal = l / 100;

    let r: number, g: number, b: number;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };

      const q = lDecimal < 0.5
        ? lDecimal * (1 + sDecimal)
        : lDecimal + sDecimal - lDecimal * sDecimal;
      const p = 2 * lDecimal - q;

      r = hue2rgb(p, q, hDecimal + 1/3);
      g = hue2rgb(p, q, hDecimal);
      b = hue2rgb(p, q, hDecimal - 1/3);
    }

    const toHex = (x: number): string => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  private randomInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private getContrastTextColor(backgroundColor: string): string {
    const hex = backgroundColor.replace('#', '');
    const [r, g, b] = hex.match(/.{2}/g)!
      .map(colorPart => parseInt(colorPart, 16));

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness >= 128 ? '#000000' : '#ffffff';
  }

}
