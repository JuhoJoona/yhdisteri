export default function KayttoehdotPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 dark:text-white">
      <h1 className="text-3xl font-bold mb-6">KÄYTTÖEHDOT – YHDISTERI</h1>
      <p className="mb-4">Voimaantulopäivä: 1.4.2025</p>
      <p className="mb-6 dark:text-white">
        Nämä käyttöehdot ("Ehdot") säätelevät Yhdisteri-nimisen
        ohjelmistopalvelun ("Palvelu") käyttöä. Palvelun tarjoaa Pöhinä Group Oy
        (Y-tunnus: 3419352-5) ("Palveluntarjoaja"). Palvelu on suunnattu
        yhdistyksille ja seuroille...
      </p>

      <Section title="1 § PALVELUN BETA-VAIHE JA MAKSUTTOMUUS">
        <List
          items={[
            'Palvelu toimitetaan "sellaisena kuin se on"...',
            'Palvelussa voi esiintyä keskeneräisiä...',
            'Palveluntarjoaja ei vastaa mistään...',
            'Palveluntarjoajalla on oikeus tehdä muutoksia...',
          ]}
        />
      </Section>

      <Section title="2 § MAKSULIIKENNE JA STRIPE CONNECT">
        <List
          items={[
            'Palvelu mahdollistaa jäsenmaksujen käsittelyn...',
            'Käyttäjä vastaa itse Stripe-tilin avaamisesta...',
            'Palveluntarjoaja ei ole vastuussa Stripe-palvelun toimivuudesta...',
          ]}
        />
      </Section>

      <Section title="3 § VASTUUNRAJOITUS">
        <List
          items={[
            'Palveluntarjoaja ei vastaa Palvelun sisällön oikeellisuudesta...',
            'Palveluntarjoaja ei vastaa mistään välillisistä...',
          ]}
        />
      </Section>

      <Section title="4 § HENKILÖTIETOJEN KÄSITTELY JA TIETOSUOJA">
        <List
          items={[
            'Palvelun kautta käsiteltävät henkilötiedot käsitellään GDPR:n mukaisesti.',
            'Palveluntarjoaja toimii henkilötietojen käsittelijänä...',
          ]}
        />
      </Section>

      <Section title="5 § KÄYTTÖEHTOJEN MUUTTAMINEN">
        <List
          items={[
            'Palveluntarjoajalla on oikeus muuttaa näitä Ehtoja...',
            'Muutoksista ilmoitetaan käyttäjille sähköpostitse...',
            'Beta-vaiheen päättymisestä ilmoitetaan erikseen...',
          ]}
        />
      </Section>

      <Section title="6 § SOVELLETTAVA LAKI JA RIIDANRATKAISU">
        <List
          items={[
            'Näihin Ehtoihin sovelletaan Suomen lakia...',
            'Riitatilanteet pyritään ratkaisemaan ensisijaisesti neuvotteluteitse.',
          ]}
        />
      </Section>

      <p className="mt-6 dark:text-white">
        Mahdolliset kysymykset tai yhteydenotot näihin Ehtoihin liittyen tulee
        osoittaa kirjallisesti Palveluntarjoajalle osoitteeseen{' '}
        <a href="mailto:joni@pohina.group" className="text-blue-600 underline">
          joni@pohina.group
        </a>
        .
      </p>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-2 dark:text-white">{title}</h2>
      {children}
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="list-disc pl-6 space-y-2 dark:text-white">
      {items.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  );
}
