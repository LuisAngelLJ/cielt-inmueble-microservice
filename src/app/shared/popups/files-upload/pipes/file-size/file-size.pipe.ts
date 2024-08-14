import { Pipe, PipeTransform } from '@angular/core';
//unidades de medida
const FILE_SIZE_UNITS = ['B', 'KB', 'MG', 'GB', 'PB', 'EB', 'ZB', 'YB'];
const FILE_SIZE_UNITS_LONG = ['Byte', 'Kilobytes', 'Megabytes', 'Gigabytes', 'Pettabytes', 'Exabytes', 'Zettabytes', 'Yottabytes'];

@Pipe({
  name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {
  //implementar función matemática en este método
  transform(sizeInBytes: number, longForm?: boolean): string {
    const units = longForm ? FILE_SIZE_UNITS_LONG : FILE_SIZE_UNITS;

    //transformar el valor byte a MB; GB etc. dependiendo del tamaño del archivo
    let power = Math.round(Math.log(sizeInBytes) / Math.log(1024));
    power = Math.min(power, units.length - 1);
    //saber cual es el tamaño total
    const size = sizeInBytes / Math.pow(1024, power);
    const formattedSize = Math.round(size * 100) / 100;
    const unit = units[power];

    return size ? `${formattedSize} ${unit}` : '0';
  }

}
