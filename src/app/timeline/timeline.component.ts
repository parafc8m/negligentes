import { Component, OnInit } from '@angular/core';
import { TimelineService } from '../services/timeline.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  diario: any[];

  constructor(private timelineService: TimelineService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.timelineService.getDiario().subscribe(rtn => {
        this.diario = rtn;

        this.timelineService.getTimeline(0, 100).subscribe(rtn => {
          this.diario.forEach(dia => {
            dia.comentarios = rtn.filter(c => dia.fecha.getTime() === c.fecha.getTime());
          })
        });

        this.diario = this.diario.filter(dia => {
          const hayDesc = Array.isArray(dia.descripcion) && dia.descripcion.length > 0;
          const hayComentarios = Array.isArray(dia.comentarios) && dia.comentarios.length > 0;

          return hayDesc || hayComentarios;
        });
    });
  }

  getUrlVideo(url) {    
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + url);
  }
}
