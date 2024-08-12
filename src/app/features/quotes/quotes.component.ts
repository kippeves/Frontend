import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
@Component({
    selector: 'app-quotes',
    standalone: true,
    imports: [CommonModule, FontAwesomeModule],
    templateUrl: './quotes.component.html',
    styleUrl: './quotes.component.css'
})

export class QuotesComponent {
    faQuoteLeft = faQuoteLeft
    colors: string[] = ['C5D1EB', '92AFD7', '5A7684', '395B50', '1F2F16']
    quotes: { sentence: string, person: string }[] = [
        { sentence: "Det är bättre att korsa startlinjen och drabbas av konsekvenserna än att bara stirra på linjen resten av ditt liv.", person: "Paolo Coelho" },
        { sentence: "För att få kunskap måste man studera, men för att få visdom måste man observera.", person: "Marilyn vos Savant" },
        { sentence: "Den enda personen du är ämnad att bli är personen du bestämmer dig för att bli.", person: "Ralph Waldo Emerson" },
        { sentence: "Du kan inte återvända och ändra början, men du kan börja där du är nu och ändra slutet.", person: "C.S Lewis" },
        { sentence: "Låt inte din hjärna att säga åt ditt hjärta vad du ska göra. Hjärnan ger upp för lätt.", person: "Paolo Coelho" }
    ]
}