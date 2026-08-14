/* Konus Konex — runtime i18n (SR baseline → SL / EN).
   Translates page BODY text, placeholders and <option> labels on the
   `kk-lang` event. Header & Footer translate themselves (their own dicts),
   so nodes inside #kk-header and <footer> are skipped here. Idempotent &
   reversible: originals (Serbian) are cached the first time a node is touched. */
(function () {
  var DOC_LANG = { sr: 'sr-Latn', sl: 'sl', en: 'en' };

  // key = Serbian source. value = { sl, en }
  var MAP = {
    // ---- home hero / stats ----
    "Proizvođač tehničkog tekstila · od 1894": { sl: "Proizvajalec tehničnega tekstila · od 1894", en: "Technical textile manufacturer · since 1894" },
    "Tehnički tekstil za": { sl: "Tehnični tekstil za", en: "Technical textiles for" },
    "filtraciju, transport": { sl: "filtracijo, transport", en: "filtration, transport" },
    "i industriju.": { sl: "in industrijo.", en: "and industry." },
    "Konus Konex je jedan od vodećih proizvođača tehničkih netkanih i tkanih tekstilnih materijala za industriju i domaćinstvo — i vodeći proizvođač specijalnih inženjerskih transportnih traka.": { sl: "Konus Konex je eden vodilnih proizvajalcev tehničnih netkanih in tkanih tekstilnih materialov za industrijo in dom — ter vodilni proizvajalec posebnih inženirskih transportnih trakov.", en: "Konus Konex is one of the leading manufacturers of technical nonwoven and woven textile materials for industry and home — and a leading manufacturer of special engineered conveyor belts." },
    "Zatražite ponudu": { sl: "Pošljite povpraševanje", en: "Request a quote" },
    "Pogledajte programe": { sl: "Oglejte si programe", en: "Explore programs" },
    "Slovenske Konjice · Slovenija": { sl: "Slovenske Konjice · Slovenija", en: "Slovenske Konjice · Slovenia" },
    "Netkani i tkani tehnički tekstil, filteri i trake": { sl: "Netkani in tkani tehnični tekstil, filtri in trakovi", en: "Nonwoven and woven technical textiles, filters and belts" },
    "Godina osnivanja": { sl: "Leto ustanovitve", en: "Founded" },
    "Zaposlenih": { sl: "Zaposlenih", en: "Employees" },
    "Izvoz": { sl: "Izvoz", en: "Export" },
    "Proizvodnih programa": { sl: "Proizvodnih programov", en: "Production programs" },
    "Proizvodni programi": { sl: "Proizvodni programi", en: "Production programs" },
    "Pet programa, jedan standard kvaliteta.": { sl: "Pet programov, en standard kakovosti.", en: "Five programs, one quality standard." },
    "Za svaki program pripremamo tehničke specifikacije i ponudu za vašu primenu.": { sl: "Za vsak program pripravimo tehnične specifikacije in ponudbo za vašo aplikacijo.", en: "For each program we prepare technical specifications and a quote for your application." },
    // program card descriptions (home)
    "Filtracijski mediji, filter vreće i elementi za vazduh i tečnosti.": { sl: "Filtrirni mediji, filtrske vreče in elementi za zrak in tekočine.", en: "Filter media, filter bags and elements for air and liquids." },
    "Tehnički materijali za profesionalno i industrijsko čišćenje.": { sl: "Tehnični materiali za profesionalno in industrijsko čiščenje.", en: "Technical materials for professional and industrial cleaning." },
    "Netkani nosači za sintetičku kožu visokog kvaliteta.": { sl: "Netkani nosilci za sintetično usnje visoke kakovosti.", en: "Nonwoven substrates for high-quality synthetic leather." },
    "Inženjerske transportne i pogonske trake po meri.": { sl: "Inženirski transportni in pogonski trakovi po meri.", en: "Custom engineered conveyor and power-transmission belts." },
    "Laminati za automobilsku, obućarsku i tekstilnu industriju.": { sl: "Laminati za avtomobilsko, obutveno in tekstilno industrijo.", en: "Laminates for the automotive, footwear and textile industries." },
    "Program": { sl: "Program", en: "Program" },
    // why us
    "Pouzdan industrijski partner.": { sl: "Zanesljiv industrijski partner.", en: "A reliable industrial partner." },
    "Sopstveni razvoj i proizvodnja": { sl: "Lasten razvoj in proizvodnja", en: "In-house development and production" },
    "Materijale razvijamo i proizvodimo u sopstvenim pogonima, uz kontrolu kvaliteta u svakom koraku.": { sl: "Materiale razvijamo in izdelujemo v lastnih obratih, z nadzorom kakovosti v vsakem koraku.", en: "We develop and manufacture materials in our own facilities, with quality control at every step." },
    "Inženjersko znanje": { sl: "Inženirsko znanje", en: "Engineering expertise" },
    "Rešenja projektovana i prilagođena tačno određenoj primeni i radnim uslovima.": { sl: "Rešitve, zasnovane in prilagojene točno določeni aplikaciji in obratovalnim pogojem.", en: "Solutions engineered and adapted to the exact application and operating conditions." },
    "Tradicija od 1894": { sl: "Tradicija od 1894", en: "Tradition since 1894" },
    "Više od jednog veka iskustva u proizvodnji tehničkog tekstila i izvoz na 85% tržišta.": { sl: "Več kot stoletje izkušenj v proizvodnji tehničnega tekstila in 85 % izvoza.", en: "Over a century of experience in technical textiles and 85% export." },
    "Sertifikovan kvalitet": { sl: "Certificirana kakovost", en: "Certified quality" },
    "Poslujemo u skladu sa ISO 9001, ISO 14001, IATF 16949 i OEKO-TEX standardima.": { sl: "Poslujemo skladno s standardi ISO 9001, ISO 14001, IATF 16949 in OEKO-TEX.", en: "We operate in accordance with ISO 9001, ISO 14001, IATF 16949 and OEKO-TEX standards." },
    "Brendovi grupe": { sl: "Blagovne znamke skupine", en: "Group brands" },
    "Industrijska filtracija — filtracijski mediji, vreće i elementi.": { sl: "Industrijska filtracija — filtrirni mediji, vreče in elementi.", en: "Industrial filtration — filter media, bags and elements." },
    "Transportne trake i prenos snage · zavisno društvo, Srbija.": { sl: "Transportni trakovi in prenos moči · odvisna družba, Srbija.", en: "Conveyor belts & power transmission · subsidiary, Serbia." },
    "Sintetička koža i tehnički materijali · zavisno društvo, Srbija.": { sl: "Sintetično usnje in tehnični materiali · odvisna družba, Srbija.", en: "Synthetic leather & technical materials · subsidiary, Serbia." },
    // quality / sustainability (home)
    "Kvalitet i skladnost": { sl: "Kakovost in skladnost", en: "Quality and compliance" },
    "Sertifikovano. Dokazivo. Sledljivo.": { sl: "Certificirano. Dokazljivo. Sledljivo.", en: "Certified. Provable. Traceable." },
    "Naši procesi i materijali usklađeni su sa međunarodnim standardima kvaliteta i upravljanja životnom sredinom. Sertifikate i dokumentaciju dostavljamo na zahtev.": { sl: "Naši procesi in materiali so usklajeni z mednarodnimi standardi kakovosti in ravnanja z okoljem. Certifikate in dokumentacijo posredujemo na zahtevo.", en: "Our processes and materials comply with international quality and environmental management standards. We provide certificates and documentation on request." },
    "Svi sertifikati": { sl: "Vsi certifikati", en: "All certificates" },
    "Kvalitet": { sl: "Kakovost", en: "Quality" },
    "Životna sredina": { sl: "Okolje", en: "Environment" },
    "Automobilska ind.": { sl: "Avtomobilska ind.", en: "Automotive ind." },
    "Bez štetnih supstanci": { sl: "Brez škodljivih snovi", en: "No harmful substances" },
    "Održivost": { sl: "Trajnost", en: "Sustainability" },
    "Vrednost za kupce, odgovornost prema okolini.": { sl: "Vrednost za kupce, odgovornost do okolja.", en: "Value for customers, responsibility for the environment." },
    "Želimo da budemo vodeća i prepoznatljiva kompanija za najzahtevnije kupce. Dodatnu vrednost stvaramo kroz inovacije, kreativnost, fleksibilnost i dogovoreni kvalitet proizvoda.": { sl: "Želimo biti vodilno in prepoznavno podjetje za najzahtevnejše kupce. Dodano vrednost ustvarjamo z inovacijami, ustvarjalnostjo, prilagodljivostjo in dogovorjeno kakovostjo izdelkov.", en: "We want to be a leading and recognizable company for the most demanding customers. We create added value through innovation, creativity, flexibility and agreed product quality." },
    "Dugoročna saradnja sa kupcima i dobavljačima": { sl: "Dolgoročno sodelovanje s kupci in dobavitelji", en: "Long-term cooperation with customers and suppliers" },
    "Podsticanje talenata i lojalnost zaposlenih": { sl: "Spodbujanje talentov in lojalnost zaposlenih", en: "Nurturing talent and employee loyalty" },
    "Transparentnost u odnosima i lokalnoj zajednici": { sl: "Transparentnost v odnosih in lokalni skupnosti", en: "Transparency in relationships and the local community" },
    "Više o održivosti": { sl: "Več o trajnosti", en: "More on sustainability" },
    "Vesti i događaji": { sl: "Novice in dogodki", en: "News & events" },
    "Gde nas možete sresti.": { sl: "Kje nas lahko srečate.", en: "Where you can meet us." },
    "Sve vesti": { sl: "Vse novice", en: "All news" },
    "Sajam": { sl: "Sejem", en: "Trade fair" },
    "Novi proizvod": { sl: "Nov izdelek", en: "New product" },
    "Techtextil — Frankfurt, Nemačka": { sl: "Techtextil — Frankfurt, Nemčija", en: "Techtextil — Frankfurt, Germany" },
    "Frankfurt, Nemačka": { sl: "Frankfurt, Nemčija", en: "Frankfurt, Germany" },
    "Frankfurt": { sl: "Frankfurt", en: "Frankfurt" },
    "Nova generacija filter materijala": { sl: "Nova generacija filtrirnih materialov", en: "New generation of filter materials" },
    "Detaljnije": { sl: "Več", en: "Read more" },
    "Potrebna vam je tehnička ponuda?": { sl: "Potrebujete tehnično ponudbo?", en: "Need a technical quote?" },
    "Pošaljite upit sa opisom primene i zahteva — pripremamo predlog materijala i ponudu.": { sl: "Pošljite povpraševanje z opisom aplikacije in zahtev — pripravimo predlog materiala in ponudbo.", en: "Send an inquiry describing your application and requirements — we'll prepare a material proposal and quote." },
    "Kontaktirajte prodaju": { sl: "Kontaktirajte prodajo", en: "Contact sales" },
    "Povpraševanje": { sl: "Povpraševanje", en: "Inquiry" },

    // ---- shared section eyebrows / program pages ----
    "Ključne primene": { sl: "Ključne aplikacije", en: "Key applications" },
    "Gde se koriste naši materijali.": { sl: "Kje se uporabljajo naši materiali.", en: "Where our materials are used." },
    "Primene": { sl: "Aplikacije", en: "Applications" },
    "Materijali i izrada": { sl: "Materiali in izdelava", en: "Materials & manufacturing" },
    "Prilagođeno vašoj primeni.": { sl: "Prilagojeno vaši aplikaciji.", en: "Tailored to your application." },
    "Materijale razvijamo i izrađujemo u sopstvenim pogonima, sa kontrolom kvaliteta u svakom koraku. Specifikaciju prilagođavamo zahtevima kupca.": { sl: "Materiale razvijamo in izdelujemo v lastnih obratih, z nadzorom kakovosti v vsakem koraku. Specifikacijo prilagodimo zahtevam kupca.", en: "We develop and manufacture materials in our own facilities, with quality control at every step. We adapt the specification to the customer's requirements." },
    "Različite gramature i završne obrade": { sl: "Različne gramature in končne obdelave", en: "Various weights and finishes" },
    "Prilagođavanje temperaturi i hemijskoj otpornosti": { sl: "Prilagoditev temperaturi in kemični odpornosti", en: "Adaptation to temperature and chemical resistance" },
    "Izrada po meri i konfekcioniranje prema zahtevu": { sl: "Izdelava po meri in konfekcioniranje po zahtevi", en: "Custom fabrication and made-to-order confection" },
    "Kvalitet i standardi": { sl: "Kakovost in standardi", en: "Quality and standards" },
    "Sertifikovani procesi.": { sl: "Certificirani procesi.", en: "Certified processes." },
    "Konus Konex posluje u skladu sa međunarodnim standardima kvaliteta i upravljanja životnom sredinom. Sertifikate i dokumentaciju dostavljamo na zahtev.": { sl: "Konus Konex posluje skladno z mednarodnimi standardi kakovosti in ravnanja z okoljem. Certifikate in dokumentacijo posredujemo na zahtevo.", en: "Konus Konex operates in accordance with international quality and environmental management standards. We provide certificates and documentation on request." },
    "Automobilska industrija": { sl: "Avtomobilska industrija", en: "Automotive industry" },
    "Tehnička dokumentacija na zahtev": { sl: "Tehnična dokumentacija na zahtevo", en: "Technical documentation on request" },
    "Tehničke listove, tabele hemijske otpornosti i uzorke pripremamo prema vašoj primeni.": { sl: "Tehnične liste, tabele kemične odpornosti in vzorce pripravimo glede na vašo aplikacijo.", en: "We prepare data sheets, chemical-resistance tables and samples for your application." },
    "Zatražite dokumentaciju": { sl: "Zahtevajte dokumentacijo", en: "Request documentation" },
    "Ponuda": { sl: "Ponudba", en: "Quote" },
    // program intros
    "Program industrijske filtracije obuhvata netkane i tkane filtracijske materijale, filter vreće i filter elemente za odvajanje čvrstih čestica iz vazduha i tečnosti.": { sl: "Program industrijske filtracije obsega netkane in tkane filtrirne materiale, filtrske vreče in filtrske elemente za ločevanje trdnih delcev iz zraka in tekočin.", en: "The industrial filtration program covers nonwoven and woven filter materials, filter bags and filter elements for separating solid particles from air and liquids." },
    "Materijali su prilagođeni zahtevima kupca — od temperature i hemijske otpornosti do efikasnosti filtracije.": { sl: "Materiali so prilagojeni zahtevam kupca — od temperature in kemične odpornosti do učinkovitosti filtracije.", en: "Materials are tailored to customer requirements — from temperature and chemical resistance to filtration efficiency." },
    "Program čišćenja obuhvata tehničke tekstilne materijale za profesionalno i industrijsko čišćenje površina.": { sl: "Program čiščenja obsega tehnične tekstilne materiale za profesionalno in industrijsko čiščenje površin.", en: "The cleaning program covers technical textile materials for professional and industrial surface cleaning." },
    "Materijale odlikuje visoka upojnost, mehanička otpornost i dugotrajnost.": { sl: "Materiale odlikuje visoka vpojnost, mehanska odpornost in dolgotrajnost.", en: "The materials feature high absorbency, mechanical resistance and durability." },
    "Netkani nosači za proizvodnju sintetičke kože visokog kvaliteta, namenjeni obućarskoj i galanterijskoj industriji.": { sl: "Netkani nosilci za proizvodnjo sintetičnega usnja visoke kakovosti, namenjeni obutveni in galanterijski industriji.", en: "Nonwoven substrates for high-quality synthetic leather, intended for the footwear and leather-goods industries." },
    "Nudimo materijale različitih gramatura i završnih obrada.": { sl: "Ponujamo materiale različnih gramatur in končnih obdelav.", en: "We offer materials in various weights and finishes." },
    "Specijalne inženjerske transportne trake i trake za prenos snage, izrađene po meri za zahtevne industrijske primene.": { sl: "Posebni inženirski transportni trakovi in trakovi za prenos moči, izdelani po meri za zahtevne industrijske aplikacije.", en: "Special engineered conveyor belts and power-transmission belts, custom-made for demanding industrial applications." },
    "Konus Konex je vodeći proizvođač posebno projektovanih transportnih traka.": { sl: "Konus Konex je vodilni proizvajalec posebej projektiranih transportnih trakov.", en: "Konus Konex is a leading manufacturer of specially engineered conveyor belts." },
    "Podstave i tehnički tekstilni laminati za automobilsku, obućarsku i tekstilnu industriju.": { sl: "Podloge in tehnični tekstilni laminati za avtomobilsko, obutveno in tekstilno industrijo.", en: "Linings and technical textile laminates for the automotive, footwear and textile industries." },
    "Laminati kombinuju netkane i tkane slojeve za tražena funkcionalna svojstva.": { sl: "Laminati združujejo netkane in tkane sloje za želene funkcionalne lastnosti.", en: "Laminates combine nonwoven and woven layers for the required functional properties." },
    "Proizvodni program": { sl: "Proizvodni program", en: "Production program" },
    "Ponuda za industrijska filtracija.": { sl: "Ponudba za industrijsko filtracijo.", en: "Quote for industrial filtration." },
    "Ponuda za čišćenje.": { sl: "Ponudba za čiščenje.", en: "Quote for cleaning." },
    "Ponuda za sintetička koža.": { sl: "Ponudba za sintetično usnje.", en: "Quote for synthetic leather." },
    "Ponuda za transportne trake i prenos snage.": { sl: "Ponudba za transportne trakove in prenos moči.", en: "Quote for conveyor belts & power transmission." },
    "Ponuda za podstave i tehnički tekstilni laminati.": { sl: "Ponudba za podloge in tehnične tekstilne laminate.", en: "Quote for linings & technical laminates." },
    "Opišite primenu, radne uslove i količine — pripremamo predlog materijala i ponudu. Program je već izabran.": { sl: "Opišite aplikacijo, obratovalne pogoje in količine — pripravimo predlog materiala in ponudbo. Program je že izbran.", en: "Describe the application, operating conditions and quantities — we'll prepare a material proposal and quote. The program is already selected." },
    // program applications (options + cards)
    "Otprašivanje u industriji": { sl: "Razprševanje v industriji", en: "Industrial dust extraction" },
    "Filter vreće i kasete": { sl: "Filtrske vreče in kasete", en: "Filter bags and cassettes" },
    "Prostorni filtri i elementi": { sl: "Prostorski filtri in elementi", en: "Space filters and elements" },
    "Filtracija tečnosti": { sl: "Filtracija tekočin", en: "Liquid filtration" },
    "Industrijske krpe": { sl: "Industrijske krpe", en: "Industrial cloths" },
    "Materijali za brisanje": { sl: "Materiali za brisanje", en: "Wiping materials" },
    "Upojni materijali": { sl: "Vpojni materiali", en: "Absorbent materials" },
    "Obućarska industrija": { sl: "Obutvena industrija", en: "Footwear industry" },
    "Galanterija": { sl: "Galanterija", en: "Leather goods" },
    "Tehnička sintetička koža": { sl: "Tehnično sintetično usnje", en: "Technical synthetic leather" },
    "Pogonske trake": { sl: "Pogonski trakovi", en: "Power belts" },
    "Trake za prenos snage": { sl: "Trakovi za prenos moči", en: "Power-transmission belts" },
    "Rešenja po meri": { sl: "Rešitve po meri", en: "Custom solutions" },
    "Tehnički laminati": { sl: "Tehnični laminati", en: "Technical laminates" },
    "Transportne trake": { sl: "Transportni trakovi", en: "Conveyor belts" },
    "Kvalitet u automobilskoj industriji.": { sl: "Kakovost v avtomobilski industriji.", en: "Quality in the automotive industry." },
    "Sistem upravljanja kvalitetom.": { sl: "Sistem vodenja kakovosti.", en: "Quality management system." },
    "Sistem upravljanja životnom sredinom.": { sl: "Sistem ravnanja z okoljem.", en: "Environmental management system." },
    "Provereni tekstilni materijali bez štetnih supstanci.": { sl: "Preverjeni tekstilni materiali brez škodljivih snovi.", en: "Tested textile materials free of harmful substances." },

    // ---- program program names (headings, breadcrumbs, footer already own) ----
    "Industrijska filtracija": { sl: "Industrijska filtracija", en: "Industrial filtration" },
    "Čišćenje": { sl: "Čiščenje", en: "Cleaning" },
    "Sintetička koža": { sl: "Sintetično usnje", en: "Synthetic leather" },
    "Transportne trake i prenos snage": { sl: "Transportni trakovi in prenos moči", en: "Conveyor belts & power transmission" },
    "Podstave i tehnički tekstilni laminati": { sl: "Podloge in tehnični tekstilni laminati", en: "Linings & technical textile laminates" },
    "Programi": { sl: "Programi", en: "Programs" },
    "Početna": { sl: "Domov", en: "Home" },

    // ---- O nama ----
    "O nama": { sl: "O nas", en: "About us" },
    "Kompanija sa sedištem u Slovenskim Konjicama, u severoistočnom delu Slovenije. Osnovana 1894. godine.": { sl: "Podjetje s sedežem v Slovenskih Konjicah, v severovzhodnem delu Slovenije. Ustanovljeno leta 1894.", en: "A company headquartered in Slovenske Konjice, in north-eastern Slovenia. Founded in 1894." },
    "Kompanija je orijentisana na kupca i zalaže se za visokokvalitetne, kupcu prilagođene inženjerske materijale i proizvode. Danas je Konus Konex grupa sa matičnom kompanijom u Sloveniji i zavisnim firmama Konus S i Vulkan Protektor u Srbiji.": { sl: "Podjetje je usmerjeno h kupcu in se zavzema za visokokakovostne, kupcu prilagojene inženirske materiale in izdelke. Danes je Konus Konex skupina z matičnim podjetjem v Sloveniji ter odvisnima družbama Konus S in Vulkan Protektor v Srbiji.", en: "The company is customer-oriented and committed to high-quality, customer-tailored engineered materials and products. Today Konus Konex is a group with its parent company in Slovenia and subsidiaries Konus S and Vulkan Protektor in Serbia." },
    "Podaci o kompaniji": { sl: "Podatki o podjetju", en: "Company details" },
    "Ime i delatnost": { sl: "Ime in dejavnost", en: "Name and activity" },
    "Proizvodnja netkanih i tkanih materijala, filtera, pogonskih i transportnih traka": { sl: "Proizvodnja netkanih in tkanih materialov, filtrov, pogonskih in transportnih trakov", en: "Manufacture of nonwoven and woven materials, filters, power and conveyor belts" },
    "Adresa": { sl: "Naslov", en: "Address" },
    "Industrijska cesta 7, SI-3210 Slovenske Konjice, Slovenija, EU": { sl: "Industrijska cesta 7, SI-3210 Slovenske Konjice, Slovenija, EU", en: "Industrijska cesta 7, SI-3210 Slovenske Konjice, Slovenia, EU" },
    "Kontakt": { sl: "Kontakt", en: "Contact" },
    "Uprava": { sl: "Vodstvo", en: "Management" },
    "Registarski broj": { sl: "Matična številka", en: "Registration number" },
    "Pravna forma": { sl: "Pravna oblika", en: "Legal form" },
    "Društvo sa ograničenom odgovornošću (d.o.o.) · privatni kapital": { sl: "Družba z omejeno odgovornostjo (d.o.o.) · zasebni kapital", en: "Limited liability company (d.o.o.) · private capital" },
    "Kompanije u grupi": { sl: "Družbe v skupini", en: "Group companies" },
    "Konus S (Srbija) · Vulkan Protektor (Srbija)": { sl: "Konus S (Srbija) · Vulkan Protektor (Srbija)", en: "Konus S (Serbia) · Vulkan Protektor (Serbia)" },
    "Broj zaposlenih": { sl: "Število zaposlenih", en: "Number of employees" },
    "157 · srednja veličina": { sl: "157 · srednje veliko podjetje", en: "157 · medium-sized" },
    "Tradicija od": { sl: "Tradicija od", en: "Tradition since" },
    "Gde se nalazimo": { sl: "Kje smo", en: "Where we are" },
    "Kontakti": { sl: "Kontakti", en: "Contact" },

    // ---- Gde se nalazimo ----
    "Sedište": { sl: "Sedež", en: "Headquarters" },
    "Slovenija, EU": { sl: "Slovenija, EU", en: "Slovenia, EU" },
    "Zavisne firme (Srbija)": { sl: "Odvisne družbe (Srbija)", en: "Subsidiaries (Serbia)" },

    // ---- Održivost ----
    "Naša vizija": { sl: "Naša vizija", en: "Our vision" },
    "Naša misija": { sl: "Naše poslanstvo", en: "Our mission" },
    "Naše vrednosti": { sl: "Naše vrednote", en: "Our values" },
    "Ono na čemu gradimo poslovanje.": { sl: "Na čemer gradimo poslovanje.", en: "What we build our business on." },
    "Vodeća i prepoznatljiva kompanija u svetu, u odabranim tržišnim segmentima, za najzahtevnije kupce.": { sl: "Vodilno in prepoznavno podjetje na svetu, v izbranih tržnih segmentih, za najzahtevnejše kupce.", en: "A leading and recognizable company in the world, in selected market segments, for the most demanding customers." },
    "Vodeća i prepoznatljiva kompanija u svetu u odabranim tržišnim segmentima za najzahtevnije kupce.": { sl: "Vodilno in prepoznavno podjetje na svetu v izbranih tržnih segmentih za najzahtevnejše kupce.", en: "A leading and recognizable company in the world in selected market segments for the most demanding customers." },
    "Nastojimo da stvaramo dodatnu vrednost za naše kupce.": { sl: "Prizadevamo si ustvarjati dodano vrednost za naše kupce.", en: "We strive to create added value for our customers." },
    "Sa kupcima gradimo dugoročnu saradnju.": { sl: "S kupci gradimo dolgoročno sodelovanje.", en: "We build long-term cooperation with customers." },
    "Zadovoljavamo kupce inovacijama, kreativnošću, fleksibilnošću i dogovorenim kvalitetom.": { sl: "Kupce zadovoljujemo z inovacijami, ustvarjalnostjo, prilagodljivostjo in dogovorjeno kakovostjo.", en: "We satisfy customers with innovation, creativity, flexibility and agreed quality." },
    "Podstičemo talente zaposlenih, bez obzira na godine, pol, veru ili zdravstveno stanje.": { sl: "Spodbujamo talente zaposlenih, ne glede na starost, spol, vero ali zdravstveno stanje.", en: "We nurture employees' talents, regardless of age, gender, religion or health status." },
    "Negujemo visoku lojalnost zaposlenih prema kompaniji.": { sl: "Negujemo visoko lojalnost zaposlenih do podjetja.", en: "We foster high employee loyalty to the company." },
    "Pružamo visokokvalitetne usluge, uz stalni fokus na razvoj, prilagođavanje i fleksibilnost.": { sl: "Zagotavljamo visokokakovostne storitve s stalnim poudarkom na razvoju, prilagajanju in prilagodljivosti.", en: "We provide high-quality services with a constant focus on development, adaptation and flexibility." },
    "Očekujemo kreativnost, odgovornost, poštovanje, doslednost, etičnost i izvornost.": { sl: "Pričakujemo ustvarjalnost, odgovornost, spoštovanje, doslednost, etičnost in izvirnost.", en: "We expect creativity, responsibility, respect, consistency, ethics and originality." },
    "Transparentnost u odnosima sa zaposlenima, kupcima, dobavljačima i lokalnom zajednicom.": { sl: "Transparentnost v odnosih z zaposlenimi, kupci, dobavitelji in lokalno skupnostjo.", en: "Transparency in relations with employees, customers, suppliers and the local community." },

    // ---- Sertifikati ----
    "Sertifikati i standardi": { sl: "Certifikati in standardi", en: "Certificates and standards" },
    "Poslujemo u skladu sa međunarodnim standardima kvaliteta i upravljanja životnom sredinom. Naši sistemi se redovno sertifikuju i obnavljaju.": { sl: "Poslujemo skladno z mednarodnimi standardi kakovosti in ravnanja z okoljem. Naši sistemi se redno certificirajo in obnavljajo.", en: "We operate in accordance with international quality and environmental management standards. Our systems are regularly certified and renewed." },
    "Potrebna vam je kopija sertifikata?": { sl: "Potrebujete kopijo certifikata?", en: "Need a copy of a certificate?" },
    "Sertifikate i tehničku dokumentaciju dostavljamo na zahtev.": { sl: "Certifikate in tehnično dokumentacijo posredujemo na zahtevo.", en: "We provide certificates and technical documentation on request." },
    "Sertifikati": { sl: "Certifikati", en: "Certificates" },

    // ---- Vesti ----
    "Sajmovi": { sl: "Sejmi", en: "Trade fairs" },
    "Novi proizvodi": { sl: "Novi izdelki", en: "New products" },
    "Sajmovi, novi proizvodi i novosti iz asortimana tehničkog tekstila.": { sl: "Sejmi, novi izdelki in novosti iz asortimaja tehničnega tekstila.", en: "Trade fairs, new products and news from the technical-textile range." },
    "Techtextil": { sl: "Techtextil", en: "Techtextil" },
    "Vesti": { sl: "Novice", en: "News" },

    // ---- Karijera ----
    "Prijava za posao": { sl: "Prijava za delo", en: "Job application" },
    "Popunite obrazac i priložite kratke podatke o sebi. Javljamo se odgovarajućim kandidatima.": { sl: "Izpolnite obrazec in priložite kratke podatke o sebi. Oglasili se bomo ustreznim kandidatom.", en: "Fill in the form and attach brief details about yourself. We contact suitable candidates." },
    "Tradicija": { sl: "Tradicija", en: "Tradition" },
    "Kolega": { sl: "Sodelavcev", en: "Colleagues" },
    "Prijavite se na oglas": { sl: "Prijavite se na razpis", en: "Apply for a position" },
    "Vaši podaci.": { sl: "Vaši podatki.", en: "Your details." },
    "Ime *": { sl: "Ime *", en: "First name *" },
    "Prezime *": { sl: "Priimek *", en: "Last name *" },
    "Poštanski broj": { sl: "Poštna številka", en: "Postal code" },
    "Mesto": { sl: "Kraj", en: "City" },
    "Datum rođenja": { sl: "Datum rojstva", en: "Date of birth" },
    "E-pošta *": { sl: "E-pošta *", en: "E-mail *" },
    "Formalno obrazovanje": { sl: "Formalna izobrazba", en: "Formal education" },
    "Strani jezici": { sl: "Tuji jeziki", en: "Foreign languages" },
    "Računarske veštine": { sl: "Računalniška znanja", en: "Computer skills" },
    "Vozačka dozvola": { sl: "Vozniško dovoljenje", en: "Driving licence" },
    "Ostale veštine": { sl: "Druga znanja", en: "Other skills" },
    "Saglasnost za obradu ličnih podataka.": { sl: "Soglasje za obdelavo osebnih podatkov.", en: "Consent to processing of personal data." },
    "Izričito pristajem na obradu mojih ličnih podataka u svrhu eventualnog zaposlenja na radnom mestu na koje sam se prijavio/la. Prosleđeni lični podaci čuvaju se u evidenciji baze tražilaca zaposlenja radi izbora odgovarajućih kandidata. Podaci se čuvaju 6 meseci, a zatim brišu. Rukovalac ličnih podataka je Konus Konex, d.o.o., Mestni trg 18, 3210 Slovenske Konjice. Saglasnost se može opozvati u bilo kom trenutku na:": { sl: "Izrecno soglašam z obdelavo mojih osebnih podatkov za namen morebitne zaposlitve na delovnem mestu, na katero sem se prijavil/-a. Posredovani osebni podatki se hranijo v evidenci baze iskalcev zaposlitve za izbor ustreznih kandidatov. Podatki se hranijo 6 mesecev, nato se izbrišejo. Upravljavec osebnih podatkov je Konus Konex, d.o.o., Mestni trg 18, 3210 Slovenske Konjice. Soglasje je mogoče kadar koli preklicati na:", en: "I expressly consent to the processing of my personal data for the purpose of possible employment in the position I applied for. The submitted personal data are kept in the job-seeker database records for selecting suitable candidates. Data are kept for 6 months and then deleted. The data controller is Konus Konex, d.o.o., Mestni trg 18, 3210 Slovenske Konjice. Consent may be withdrawn at any time at:" },
    "Pošalji": { sl: "Pošlji", en: "Submit" },
    "Hvala na prijavi.": { sl: "Hvala za prijavo.", en: "Thank you for applying." },
    "Vašu prijavu smo zabeležili. Javljamo se odgovarajućim kandidatima u skladu sa aktuelnim potrebama.": { sl: "Vašo prijavo smo zabeležili. Oglasili se bomo ustreznim kandidatom glede na trenutne potrebe.", en: "We've recorded your application. We contact suitable candidates according to current needs." },
    "Nova prijava": { sl: "Nova prijava", en: "New application" },
    "Karijera": { sl: "Kariera", en: "Careers" },

    // ---- Kontakti ----
    "Pošaljite upit za ponudu ili se obratite pravom odeljenju. Javljamo se u najkraćem roku.": { sl: "Pošljite povpraševanje za ponudbo ali se obrnite na pravi oddelek. Oglasimo se v najkrajšem času.", en: "Send a quote inquiry or reach the right department. We respond as soon as possible." },
    "Pošaljite upit.": { sl: "Pošljite povpraševanje.", en: "Send an inquiry." },
    "Opišite primenu, radne uslove i količine — pripremamo predlog materijala i ponudu.": { sl: "Opišite aplikacijo, obratovalne pogoje in količine — pripravimo predlog materiala in ponudbo.", en: "Describe the application, operating conditions and quantities — we'll prepare a material proposal and quote." },
    "Telefon": { sl: "Telefon", en: "Phone" },
    "Poruka": { sl: "Sporočilo", en: "Message" },
    "Pošaljite upit": { sl: "Pošljite povpraševanje", en: "Send inquiry" },
    "Slanjem pristajete na obradu podataka u skladu sa Pravilima o privatnosti.": { sl: "S pošiljanjem soglašate z obdelavo podatkov skladno s Pravili o zasebnosti.", en: "By submitting you agree to data processing in accordance with the Privacy Policy." },
    "Hvala na upitu.": { sl: "Hvala za povpraševanje.", en: "Thank you for your inquiry." },
    "Vaš upit smo zabeležili. Javljamo se u najkraćem roku sa predlogom materijala i ponudom.": { sl: "Vaše povpraševanje smo zabeležili. Oglasili se bomo v najkrajšem času s predlogom materiala in ponudbo.", en: "We've recorded your inquiry. We'll get back to you shortly with a material proposal and quote." },
    "Vaš upit smo zabeležili. Prodajni tim će vam se javiti u najkraćem roku sa predlogom materijala i ponudom.": { sl: "Vaše povpraševanje smo zabeležili. Prodajna ekipa se vam bo oglasila v najkrajšem času s predlogom materiala in ponudbo.", en: "We've recorded your inquiry. Our sales team will get back to you shortly with a material proposal and quote." },
    "Novi upit": { sl: "Novo povpraševanje", en: "New inquiry" },
    "Imenik po odeljenjima": { sl: "Imenik po oddelkih", en: "Directory by department" },
    "Kontaktirajte pravu osobu.": { sl: "Kontaktirajte pravo osebo.", en: "Contact the right person." },
    "Vodstvo": { sl: "Vodstvo", en: "Management" },
    "Nabavka": { sl: "Nabava", en: "Procurement" },
    "Prodaja": { sl: "Prodaja", en: "Sales" },
    "Razvoj": { sl: "Razvoj", en: "Development" },
    "Administrator": { sl: "Administrator", en: "Administrator" },
    "Prokurist": { sl: "Prokurist", en: "Authorized signatory" },
    "Vodja nabavke": { sl: "Vodja nabave", en: "Head of procurement" },
    "Pomoćnica vodje nabavke": { sl: "Pomočnica vodje nabave", en: "Assistant head of procurement" },
    "Opšti upit": { sl: "Splošno povpraševanje", en: "General inquiry" },

    // ---- Legal ----
    "Pravila o privatnosti": { sl: "Pravila o zasebnosti", en: "Privacy policy" },
    "Rukovalac podataka": { sl: "Upravljavec podatkov", en: "Data controller" },
    "Rukovalac ličnih podataka je Konus Konex, d.o.o., Mestni trg 18, 3210 Slovenske Konjice.": { sl: "Upravljavec osebnih podatkov je Konus Konex, d.o.o., Mestni trg 18, 3210 Slovenske Konjice.", en: "The controller of personal data is Konus Konex, d.o.o., Mestni trg 18, 3210 Slovenske Konjice." },
    "Svrha obrade": { sl: "Namen obdelave", en: "Purpose of processing" },
    "Lične podatke obrađujemo isključivo u svrhe za koje su prikupljeni — komunikacija, ponude, zapošljavanje i ispunjavanje zakonskih obaveza.": { sl: "Osebne podatke obdelujemo izključno za namene, za katere so bili zbrani — komunikacija, ponudbe, zaposlovanje in izpolnjevanje zakonskih obveznosti.", en: "We process personal data solely for the purposes for which it was collected — communication, quotes, recruitment and fulfilling legal obligations." },
    "Čuvanje podataka": { sl: "Hramba podatkov", en: "Data retention" },
    "Podatke čuvamo samo onoliko koliko je potrebno za ostvarenje svrhe obrade, odnosno u skladu sa zakonskim rokovima.": { sl: "Podatke hranimo le toliko časa, kolikor je potrebno za dosego namena obdelave oziroma skladno z zakonskimi roki.", en: "We keep data only as long as necessary to achieve the purpose of processing, or in accordance with statutory periods." },
    "Prava korisnika": { sl: "Pravice uporabnikov", en: "User rights" },
    "U svakom trenutku imate pravo na pristup, ispravku, brisanje i prenos svojih podataka, kao i na opoziv saglasnosti.": { sl: "Kadar koli imate pravico do dostopa, popravka, izbrisa in prenosa svojih podatkov ter do preklica soglasja.", en: "At any time you have the right to access, rectify, erase and port your data, and to withdraw consent." },
    "Uslovi poslovanja": { sl: "Pogoji poslovanja", en: "Terms of business" },
    "Opšte odredbe": { sl: "Splošne določbe", en: "General provisions" },
    "Ovi uslovi poslovanja definišu prava i obaveze između kompanije Konus Konex d.o.o. i njenih poslovnih partnera.": { sl: "Ti pogoji poslovanja opredeljujejo pravice in obveznosti med podjetjem Konus Konex d.o.o. in njegovimi poslovnimi partnerji.", en: "These terms of business define the rights and obligations between Konus Konex d.o.o. and its business partners." },
    "Naručivanje i isporuka": { sl: "Naročanje in dobava", en: "Ordering and delivery" },
    "Porudžbine se potvrđuju u pisanoj formi. Rokovi isporuke dogovaraju se za svaku porudžbinu posebno.": { sl: "Naročila se potrjujejo v pisni obliki. Dobavni roki se dogovorijo za vsako naročilo posebej.", en: "Orders are confirmed in writing. Delivery times are agreed for each order individually." },
    "Plaćanje": { sl: "Plačilo", en: "Payment" },
    "Uslovi plaćanja definišu se ugovorom ili ponudom za svaki posao.": { sl: "Plačilni pogoji se določijo s pogodbo ali ponudbo za vsak posel.", en: "Payment terms are defined by contract or quote for each transaction." },
    "Reklamacije": { sl: "Reklamacije", en: "Complaints" },
    "Reklamacije se prijavljuju u pisanoj formi u dogovorenom roku od prijema robe.": { sl: "Reklamacije se prijavijo v pisni obliki v dogovorjenem roku od prevzema blaga.", en: "Complaints are submitted in writing within the agreed period from receipt of goods." },

    // ---- placeholders ----
    "@ph:Naziv kompanije": { sl: "Naziv podjetja", en: "Company name" },
    "@ph:Kontakt osoba": { sl: "Kontaktna oseba", en: "Contact person" },
    "@ph:ime@kompanija.rs": { sl: "ime@podjetje.si", en: "name@company.com" },
    "@ph:+381 ...": { sl: "+386 ...", en: "+386 ..." },
    "@ph:Opišite primenu, radne uslove, količine ...": { sl: "Opišite aplikacijo, obratovalne pogoje, količine ...", en: "Describe the application, operating conditions, quantities ..." },
    "@ph:Materijal, radni uslovi, količine, dimenzije ...": { sl: "Material, obratovalni pogoji, količine, dimenzije ...", en: "Material, operating conditions, quantities, dimensions ..." },
    "@ph:npr. B kategorija": { sl: "npr. kategorija B", en: "e.g. category B" },

    // ---- document titles ----
    "Konus Konex — Tehnički tekstil, filtracija i transportne trake": { sl: "Konus Konex — Tehnični tekstil, filtracija in transportni trakovi", en: "Konus Konex — Technical textiles, filtration and conveyor belts" },
    "O nama — Konus Konex d.o.o.": { sl: "O nas — Konus Konex d.o.o.", en: "About us — Konus Konex d.o.o." },
    "Gde se nalazimo — Konus Konex": { sl: "Kje smo — Konus Konex", en: "Where we are — Konus Konex" },
    "Održivost — Konus Konex": { sl: "Trajnost — Konus Konex", en: "Sustainability — Konus Konex" },
    "Industrijska filtracija (FILTECH) — Konus Konex": { sl: "Industrijska filtracija (FILTECH) — Konus Konex", en: "Industrial filtration (FILTECH) — Konus Konex" },
    "Čišćenje — tehnički materijali — Konus Konex": { sl: "Čiščenje — tehnični materiali — Konus Konex", en: "Cleaning — technical materials — Konus Konex" },
    "Sintetička koža (Konus S) — Konus Konex": { sl: "Sintetično usnje (Konus S) — Konus Konex", en: "Synthetic leather (Konus S) — Konus Konex" },
    "Transportne trake i prenos snage (Vulkan Protektor) — Konus Konex": { sl: "Transportni trakovi in prenos moči (Vulkan Protektor) — Konus Konex", en: "Conveyor belts & power transmission (Vulkan Protektor) — Konus Konex" },
    "Podstave i tehnički tekstilni laminati — Konus Konex": { sl: "Podloge in tehnični tekstilni laminati — Konus Konex", en: "Linings & technical textile laminates — Konus Konex" },
    "Sertifikati i standardi — Konus Konex": { sl: "Certifikati in standardi — Konus Konex", en: "Certificates and standards — Konus Konex" },
    "Karijera — prijava za posao — Konus Konex": { sl: "Kariera — prijava za delo — Konus Konex", en: "Careers — job application — Konus Konex" },
    "Vesti i događaji — Konus Konex": { sl: "Novice in dogodki — Konus Konex", en: "News & events — Konus Konex" },
    "Kontakti — Konus Konex": { sl: "Kontakti — Konus Konex", en: "Contact — Konus Konex" },
    "Pravila o privatnosti — Konus Konex": { sl: "Pravila o zasebnosti — Konus Konex", en: "Privacy policy — Konus Konex" },
    "Uslovi poslovanja — Konus Konex": { sl: "Pogoji poslovanja — Konus Konex", en: "Terms of business — Konus Konex" }
  };

  // options reuse the plain-text keys (with @opt: prefix mapping onto same values)
  function optKey(t){ return MAP['@opt:'+t] ? '@opt:'+t : (MAP[t] ? t : null); }

  // Build reverse lookups so we can revert ANY language back to Serbian purely
  // from the live DOM — no cached node refs (DC re-renders replace nodes).
  var FWD = { text:{}, ph:{}, opt:{} };   // serbian -> {sl,en}
  var REV = { text:{}, ph:{}, opt:{} };   // sl|en string -> serbian
  (function build(){
    for (var key in MAP){
      var v = MAP[key], bucket, sr;
      if (key.indexOf('@ph:')===0){ bucket='ph'; sr=key.slice(4); }
      else if (key.indexOf('@opt:')===0){ bucket='opt'; sr=key.slice(5); }
      else { bucket='text'; sr=key; }
      FWD[bucket][sr] = v;
      if (v.sl && v.sl!==sr && !REV[bucket][v.sl]) REV[bucket][v.sl] = sr;
      if (v.en && v.en!==sr && !REV[bucket][v.en]) REV[bucket][v.en] = sr;
    }
  })();

  var applying = false; // guard so our own DOM writes don't retrigger the observer
  var srTitle = (typeof document !== 'undefined') ? document.title : '';

  function inSkip(node){
    var el = node.nodeType === 3 ? node.parentElement : node;
    return !!(el && el.closest && el.closest('#kk-header, footer'));
  }

  function setText(node, raw, val){
    var lead = raw.match(/^\s*/)[0], trail = raw.match(/\s*$/)[0];
    node.nodeValue = lead + val + trail;
  }

  // Revert everything under root to Serbian using REV maps.
  function toSerbian(root){
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), n;
    while ((n = w.nextNode())){
      var raw = n.nodeValue, t = raw.replace(/\s+/g,' ').trim();
      if (!t || inSkip(n)) continue;
      if (REV.text[t]) setText(n, raw, REV.text[t]);
    }
    root.querySelectorAll('[placeholder]').forEach(function(el){
      if (inSkip(el)) return;
      var p = el.getAttribute('placeholder').trim();
      if (REV.ph[p]) el.setAttribute('placeholder', REV.ph[p]);
    });
    root.querySelectorAll('option').forEach(function(el){
      if (inSkip(el)) return;
      var t = el.textContent.trim();
      if (REV.opt[t]) el.textContent = REV.opt[t];
      else if (REV.text[t]) el.textContent = REV.text[t];
    });
  }

  // Translate Serbian -> target lang under root.
  function toLang(root, lang){
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), n;
    var batch = [];
    while ((n = w.nextNode())){
      var raw = n.nodeValue, t = raw.replace(/\s+/g,' ').trim();
      if (!t || inSkip(n)) continue;
      var e = FWD.text[t];
      if (e && e[lang]) batch.push([n, raw, e[lang]]);
    }
    batch.forEach(function(b){ setText(b[0], b[1], b[2]); });
    root.querySelectorAll('[placeholder]').forEach(function(el){
      if (inSkip(el)) return;
      var e = FWD.ph[el.getAttribute('placeholder').trim()];
      if (e && e[lang]) el.setAttribute('placeholder', e[lang]);
    });
    root.querySelectorAll('option').forEach(function(el){
      if (inSkip(el)) return;
      var t = el.textContent.trim();
      var e = FWD.opt[t] || FWD.text[t];
      if (e && e[lang]) el.textContent = e[lang];
    });
  }

  function apply(lang){
    applying = true;
    var root = document.getElementById('dc-root') || document.body;
    toSerbian(root);                     // reset to baseline first (reversible)
    document.title = srTitle;
    document.documentElement.lang = DOC_LANG[lang] || 'sr-Latn';
    if (lang !== 'sr'){
      var tt = FWD.text[srTitle]; if (tt && tt[lang]) document.title = tt[lang];
      toLang(root, lang);
    }
    // let the guard release after the mutation queue flushes
    setTimeout(function(){ applying = false; }, 0);
  }

  function currentLang(){
    var l = 'sr';
    try { l = localStorage.getItem('kk-lang') || 'sr'; } catch(e){}
    return (l==='sl'||l==='en'||l==='sr') ? l : 'sr';
  }

  function boot(){
    var l = currentLang();
    if (l !== 'sr') apply(l);
    setTimeout(function(){ var c = currentLang(); if (c !== 'sr') apply(c); }, 300);
    setTimeout(function(){ var c = currentLang(); if (c !== 'sr') apply(c); }, 900);
    // DC re-renders parts of the DOM on interaction (forms, menus) — re-apply then
    var pending = null;
    var root = document.getElementById('dc-root') || document.body;
    var obs = new MutationObserver(function(){
      if (applying) return;
      if (currentLang() === 'sr') return;
      clearTimeout(pending);
      pending = setTimeout(function(){ var c = currentLang(); if (c !== 'sr') apply(c); }, 120);
    });
    try { obs.observe(root, { childList: true, subtree: true, characterData: true }); } catch(e){}
  }

  window.addEventListener('kk-lang', function(e){ apply((e.detail==='sl'||e.detail==='en'||e.detail==='sr')?e.detail:'sr'); });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();