import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tietosuojaseloste | Yhdisteri',
  description: 'Yhdisteri-palvelun tietosuojaseloste',
};

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">TIETOSUOJASELOSTE - YHDISTERI</h1>
      <p className="mb-6">Päivitetty: 16.4.2025</p>

      <p className="mb-8">
        Tämä tietosuojaseloste koskee Pöhinä Group Oy:n
        (&ldquo;Rekisterinpitäjä&rdquo;, &ldquo;me&rdquo;) tarjoamaa
        Yhdisteri-palvelua (&ldquo;Palvelu&rdquo;). Selosteessa kerrotaan, miten
        käsittelemme henkilötietoja, joita kerätään palvelun käyttäjistä ja
        heidän jäsenistään.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. REKISTERINPITÄJÄ</h2>
        <p>Pöhinä Group Oy</p>
        <p>Y-tunnus: 3419352-5</p>
        <p>Osoite: Järjestökuja 2, 05400, Jokela</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          2. KÄSITELTÄVÄT HENKILÖTIEDOT
        </h2>
        <p className="mb-2">Käsittelemme seuraavia henkilötietoja:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Yhdistysten edustajien tiedot (nimi, sähköposti, puhelinnumero,
            organisaatio, rooli)
          </li>
          <li>
            Jäsenrekisterin sisältämät tiedot (esimerkiksi jäsenen nimi,
            sähköposti, osoite, jäsenyystiedot)
          </li>
          <li>Maksutapahtumien lokitiedot (Stripe Connectin kautta)</li>
          <li>
            Kirjautumis- ja käyttölogitiedot (IP-osoite, ajankohta, tapahtumat)
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          3. HENKILÖTIETOJEN KÄSITTELYN TARKOITUKSET JA OIKEUSPERUSTE
        </h2>
        <p className="mb-2">
          Käsittelemme henkilötietoja seuraaviin tarkoituksiin:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>Palvelun tarjoaminen ja ylläpito</li>
          <li>Käyttäjätunnusten hallinta ja tunnistaminen</li>
          <li>
            Jäsenrekisterin tekninen tallentaminen ja käsittely asiakkaan
            puolesta
          </li>
          <li>Maksuliikenteen mahdollistaminen Stripe Connectin avulla</li>
          <li>
            Palvelun kehittäminen, raportointi ja väärinkäytösten estäminen
          </li>
        </ul>

        <p className="font-semibold mb-2">Oikeusperusteet:</p>
        <p className="mb-2">Käsittely perustuu GDPR:n mukaisesti joko:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Sopimuksen täytäntöönpanoon (Art. 6.1.b)</li>
          <li>Rekisterinpitäjän oikeutettuun etuun (Art. 6.1.f)</li>
          <li>
            Asiakasorganisaation ja sen jäsenten väliseen sopimussuhteeseen,
            jossa Pöhinä Group Oy toimii henkilötietojen käsittelijänä
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          4. HENKILÖTIETOJEN LUOVUTUKSET JA SIIRROT
        </h2>
        <p className="mb-2">
          Henkilötietoja ei luovuteta ulkopuolisille, paitsi:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>Stripe Payments Europe Ltd:lle maksujen käsittelemiseksi</li>
          <li>Teknologiapalveluiden tarjoajille (esim. pilvitallennus)</li>
        </ul>
        <p>
          Tietoja ei siirretä EU/ETA-alueen ulkopuolelle ilman asianmukaisia
          suojatoimia (esim. EU:n vakiolausekkeet).
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          5. TIETOJEN SÄILYTYSAIKA
        </h2>
        <p className="mb-2">
          Henkilötietoja säilytetään vain niin kauan kuin on tarpeen:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>Sopimusvelvoitteiden täyttämiseksi</li>
          <li>Lakisääteisten velvollisuuksien täyttämiseksi</li>
          <li>Asiakassuhteen hoitamiseksi</li>
        </ul>
        <p>Tiedot poistetaan tai anonymisoidaan säilytysajan päätyttyä.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          6. REKISTERÖIDYN OIKEUDET
        </h2>
        <p className="mb-2">Rekisteröidyllä on oikeus:</p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>Saada pääsy omiin tietoihinsa</li>
          <li>Pyytää tietojen oikaisua tai poistamista</li>
          <li>Vastustaa tai rajoittaa käsittelyä</li>
          <li>Siirtää tiedot järjestelmästä toiseen</li>
          <li>
            Tehdä valitus valvontaviranomaiselle (Tietosuojavaltuutetun
            toimisto)
          </li>
        </ul>
        <p>
          Pyynnöt voi osoittaa sähköpostitse osoitteeseen joni@pohina.group.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. TIETOTURVA</h2>
        <p>
          Käytämme asianmukaisia teknisiä ja organisatorisia toimenpiteitä
          henkilötietojen suojaamiseksi, mukaan lukien salaus, käyttöoikeuksien
          rajoittaminen ja lokitus.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">8. YHTEYDENOTOT</h2>
        <p className="mb-2">
          Kaikki henkilötietojen käsittelyyn liittyvät kysymykset tulee osoittaa
          kirjallisesti osoitteeseen:
        </p>
        <p>Pöhinä Group Oy</p>
        <p>Sähköposti: joni@pohina.group</p>
      </section>
    </div>
  );
}
