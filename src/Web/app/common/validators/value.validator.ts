import { FormControl } from '@angular/forms';

export const minValueValidator = (min: number) => {
    return (control: FormControl) => {
        var num = +control.value;
        if (isNaN(num) || num < min) {
            return {
                minValue: { valid: false }
            };
        }
        return null;
    };
};