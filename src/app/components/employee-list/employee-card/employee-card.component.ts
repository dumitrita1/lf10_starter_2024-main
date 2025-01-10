import { Component, Input, OnInit } from '@angular/core';
import {Employee} from "../dummy-model/EmployeeDummy";

/**
 * Configuration for card color generation
 */
interface ColorConfig {
  saturationRange: [number, number];
  lightnessRange: [number, number];
}

@Component({
  selector: 'app-employee-card',
  standalone: true,
  imports: [],
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

  bgColorHex: string;
  textColorHex: string;

  private static readonly colorConfigs: Record<string, ColorConfig> = {
    default: {
      saturationRange: [15, 30],
      lightnessRange: [85, 95]
    },
    highlighted: {
      saturationRange: [30, 45],
      lightnessRange: [80, 90]
    }
  };

  constructor() {
    this.bgColorHex = '#ffffff';
    this.textColorHex = '#000000';
  }

  ngOnInit(): void {
    this.bgColorHex = this.generateCardColor();
    this.textColorHex = this.getContrastTextColor(this.bgColorHex);
  }

  /**
   * Converts HSL values to hex color string
   */
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

  /**
   * Generates a random number within a range
   */
  private randomInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generates a card background color based on employee properties
   */
  private generateCardColor(): string {
    // You could use different configs based on employee properties
    const config = EmployeeCardComponent.colorConfigs['default'];

    // Generate random HSL values within configured ranges
    const hue = this.randomInRange(0, 360);
    const saturation = this.randomInRange(
      config.saturationRange[0],
      config.saturationRange[1]
    );
    const lightness = this.randomInRange(
      config.lightnessRange[0],
      config.lightnessRange[1]
    );

    return this.hslToHex(hue, saturation, lightness);
  }

  /**
   * Calculates contrasting text color for given background
   */
  private getContrastTextColor(backgroundColor: string): string {
    const hex = backgroundColor.replace('#', '');
    if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
      throw new Error('Invalid hex color format. Expected: #RRGGBB or RRGGBB');
    }

    const [r, g, b] = hex.match(/.{2}/g)!
      .map(colorPart => parseInt(colorPart, 16));

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness >= 128 ? '#000000' : '#ffffff';
  }
}
