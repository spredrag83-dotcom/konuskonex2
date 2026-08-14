/* Konus Konex — runtime i18n (ENGLISH baseline → Slovenian / Serbian-Latin).
   Master content on every page is written in English. This script translates
   page BODY text, input placeholders and <option> labels whenever the user
   picks a language (the `kk-lang` event) or on load (localStorage `kk-lang`).
   Header & Footer translate themselves (their own dicts) and are skipped here.
   Idempotent & reversible: any language reverts to English purely from the DOM. */
(function () {
  var DOC_LANG = { en: 'en', sl: 'sl', sr: 'sr-Latn' };

  // key = English source. value = { sl, sr }
  var MAP = {
    // ============ shared chrome / nav / CTAs ============
    "Home": { sl: "Domov", sr: "Početna" },
    "Programs": { sl: "Programi", sr: "Programi" },
    "Contact": { sl: "Kontakt", sr: "Kontakt" },
    "Request a quote": { sl: "Pošljite povpraševanje", sr: "Zatražite ponudu" },
    "Explore programs": { sl: "Oglejte si programe", sr: "Pogledajte programe" },
    "See specifications": { sl: "Oglejte si specifikacije", sr: "Pogledajte specifikacije" },
    "View program": { sl: "Ogled programa", sr: "Pogledaj program" },
    "All certificates": { sl: "Vsi certifikati", sr: "Svi sertifikati" },
    "Request documents": { sl: "Zahtevajte dokumente", sr: "Zatražite dokumente" },
    "Request documentation": { sl: "Zahtevajte dokumentacijo", sr: "Zatražite dokumentaciju" },
    "Applications": { sl: "Aplikacije", sr: "Primene" },
    "Materials & specs": { sl: "Materiali in specifikacije", sr: "Materijali i specifikacije" },
    "Substrates & specs": { sl: "Nosilci in specifikacije", sr: "Nosači i specifikacije" },
    "Constructions & specs": { sl: "Konstrukcije in specifikacije", sr: "Konstrukcije i specifikacije" },
    "Products & specs": { sl: "Izdelki in specifikacije", sr: "Proizvodi i specifikacije" },
    "Types & specs": { sl: "Tipi in specifikacije", sr: "Tipovi i specifikacije" },
    "Quality": { sl: "Kakovost", sr: "Kvalitet" },
    "Service": { sl: "Storitve", sr: "Servis" },
    "Downloads": { sl: "Prenosi", sr: "Preuzimanja" },
    "Quote": { sl: "Ponudba", sr: "Ponuda" },
    "Related programs": { sl: "Sorodni programi", sr: "Srodni programi" },
    "New inquiry": { sl: "Novo povpraševanje", sr: "Novi upit" },
    "New request": { sl: "Nova zahteva", sr: "Novi zahtev" },
    "Send inquiry": { sl: "Pošljite povpraševanje", sr: "Pošaljite upit" },
    "Send RFQ": { sl: "Pošljite povpraševanje", sr: "Pošaljite upit" },
    "Typical response time: within 1 business day.": { sl: "Običajen odzivni čas: v enem delovnem dnevu.", sr: "Uobičajeno vreme odgovora: u roku od jednog radnog dana." },

    // ============ home — hero ============
    "Technical textile manufacturer · Slovenia · since 1894": { sl: "Proizvajalec tehničnega tekstila · Slovenija · od 1894", sr: "Proizvođač tehničkog tekstila · Slovenija · od 1894" },
    "Nonwoven & woven": { sl: "Netkani in tkani", sr: "Netkani i tkani" },
    "technical textiles": { sl: "tehnični tekstil", sr: "tehnički tekstil" },
    "for filtration and transport.": { sl: "za filtracijo in transport.", sr: "za filtraciju i transport." },
    "A European manufacturer of engineered nonwoven and woven materials — from filter media and finished filter bags to conveyor belts, synthetic-leather substrates and technical laminates. Vertically integrated, from fibre to finished element, with": { sl: "Evropski proizvajalec inženirsko zasnovanih netkanih in tkanih materialov — od filtrirnih medijev in izdelanih filtrskih vreč do transportnih trakov, nosilcev za sintetično usnje in tehničnih laminatov. Vertikalno integrirani, od vlakna do končnega elementa, z", sr: "Evropski proizvođač inženjerskih netkanih i tkanih materijala — od filtracijskih medija i gotovih filter vreća do transportnih traka, nosača za sintetičku kožu i tehničkih laminata. Vertikalno integrisani, od vlakna do gotovog elementa, uz" },
    "no minimum order quantity": { sl: "brez minimalne količine naročila", sr: "bez minimalne količine porudžbine" },

    // ============ home — stats band ============
    "Founded": { sl: "Ustanovljeno", sr: "Osnovano" },
    "Employees": { sl: "Zaposlenih", sr: "Zaposlenih" },
    "Export share": { sl: "Delež izvoza", sr: "Udeo izvoza" },
    "Countries served": { sl: "Držav oskrbujemo", sr: "Zemalja opslužujemo" },
    "Certified": { sl: "Certificirano", sr: "Sertifikovano" },

    // ============ home — programs ============
    "Production programs": { sl: "Proizvodni programi", sr: "Proizvodni programi" },
    "Five programs, one quality standard.": { sl: "Pet programov, en standard kakovosti.", sr: "Pet programa, jedan standard kvaliteta." },
    "Each program is engineered to your application — with technical specifications and a quote prepared on request.": { sl: "Vsak program je inženirsko prilagojen vaši aplikaciji — s tehničnimi specifikacijami in ponudbo, pripravljeno na zahtevo.", sr: "Svaki program je inženjerski prilagođen vašoj primeni — sa tehničkim specifikacijama i ponudom pripremljenom na zahtev." },
    "Technical wipes": { sl: "Tehnične krpe", sr: "Tehničke krpe" },
    "Industrial filtration": { sl: "Industrijska filtracija", sr: "Industrijska filtracija" },
    "Cleaning materials": { sl: "Materiali za čiščenje", sr: "Materijali za čišćenje" },
    "Synthetic leather": { sl: "Sintetično usnje", sr: "Sintetička koža" },
    "Conveyor & power belts": { sl: "Transportni in pogonski trakovi", sr: "Transportne i pogonske trake" },
    "Linings & laminates": { sl: "Podloge in laminati", sr: "Podstave i laminati" },
    "Needle-felt filter media, filter bags and elements for air & liquid separation.": { sl: "Iglani filtrirni mediji, filtrske vreče in elementi za ločevanje zraka in tekočin.", sr: "Iglani filtracijski mediji, filter vreće i elementi za odvajanje vazduha i tečnosti." },
    "Technical nonwovens for professional and industrial cleaning.": { sl: "Tehnični netkani materiali za profesionalno in industrijsko čiščenje.", sr: "Tehnički netkani materijali za profesionalno i industrijsko čišćenje." },
    "High-quality nonwoven substrates for synthetic leather.": { sl: "Kakovostni netkani nosilci za sintetično usnje.", sr: "Kvalitetni netkani nosači za sintetičku kožu." },
    "Engineered conveyor and power-transmission belts, made to spec.": { sl: "Inženirski transportni in pogonski trakovi, izdelani po specifikaciji.", sr: "Inženjerske transportne i pogonske trake, izrađene po specifikaciji." },
    "Technical textile laminates for automotive, footwear and textile industries.": { sl: "Tehnični tekstilni laminati za avtomobilsko, obutveno in tekstilno industrijo.", sr: "Tehnički tekstilni laminati za automobilsku, obućarsku i tekstilnu industriju." },

    // ============ home — industries ============
    "Solutions by industry": { sl: "Rešitve po panogah", sr: "Rešenja po industrijama" },
    "Engineered for your process.": { sl: "Zasnovano za vaš proces.", sr: "Projektovano za vaš proces." },
    "Tell us the process conditions — temperature, dust or media, throughput — and we recommend the material and finished element.": { sl: "Povejte nam pogoje procesa — temperaturo, prah ali medij, pretok — in priporočimo material ter končni element.", sr: "Recite nam uslove procesa — temperaturu, prašinu ili medij, protok — i preporučujemo materijal i gotov element." },
    "Cement & construction": { sl: "Cement in gradbeništvo", sr: "Cement i građevinarstvo" },
    "High-temperature flue-gas dedusting.": { sl: "Odpraševanje dimnih plinov pri visokih temperaturah.", sr: "Otprašivanje dimnih gasova na visokim temperaturama." },
    "Food & beverage": { sl: "Hrana in pijača", sr: "Hrana i piće" },
    "Food-contact compliant media & belts.": { sl: "Mediji in trakovi, skladni za stik z živili.", sr: "Mediji i trake usklađeni za kontakt s hranom." },
    "Pharmaceutical": { sl: "Farmacija", sr: "Farmacija" },
    "Fine dust & process air filtration.": { sl: "Filtracija finega prahu in procesnega zraka.", sr: "Filtracija fine prašine i procesnog vazduha." },
    "Wood & furniture": { sl: "Les in pohištvo", sr: "Drvo i nameštaj" },
    "Sanding & woodworking dedusting.": { sl: "Odpraševanje pri brušenju in obdelavi lesa.", sr: "Otprašivanje pri brušenju i obradi drveta." },
    "Metallurgy & foundry": { sl: "Metalurgija in livarstvo", sr: "Metalurgija i livnice" },
    "Abrasive, high-temp fume filtration.": { sl: "Filtracija abrazivnih dimov pri visokih temperaturah.", sr: "Filtracija abrazivnih dimova na visokim temperaturama." },
    "HVAC & buildings": { sl: "HVAC in zgradbe", sr: "HVAC i zgrade" },
    "ISO 16890 air-handling media.": { sl: "Mediji za obdelavo zraka po ISO 16890.", sr: "Mediji za obradu vazduha po ISO 16890." },

    // ============ home — why us ============
    "Why Konus Konex": { sl: "Zakaj Konus Konex", sr: "Zašto Konus Konex" },
    "The small-batch European manufacturer the big ones won't be.": { sl: "Evropski proizvajalec majhnih serij, kar veliki ne bodo.", sr: "Evropski proizvođač malih serija, kakvi veliki neće biti." },
    "We run the small and custom series large producers decline — backed by 132 years of continuity, our own development, and vertical integration from fibre to finished element.": { sl: "Izdelujemo majhne serije in serije po meri, ki jih veliki proizvajalci zavračajo — s 132 leti neprekinjenega delovanja, lastnim razvojem in vertikalno integracijo od vlakna do končnega elementa.", sr: "Radimo male serije i serije po meri koje veliki proizvođači odbijaju — uz 132 godine kontinuiteta, sopstveni razvoj i vertikalnu integraciju od vlakna do gotovog elementa." },
    "Our decisive advantage": { sl: "Naša odločilna prednost", sr: "Naša presudna prednost" },
    "No minimum": { sl: "Brez minimalne", sr: "Bez minimalne" },
    "order quantity.": { sl: "količine naročila.", sr: "količine porudžbine." },
    "Personalised series with no MOQ and fast turnaround — the deciding factor for OEM and small-to-mid buyers that full-roll producers cannot serve.": { sl: "Prilagojene serije brez minimalne količine in s hitro izvedbo — odločilni dejavnik za OEM ter male in srednje kupce, ki jih proizvajalci celih rol ne morejo oskrbeti.", sr: "Personalizovane serije bez minimalne količine i sa brzom izradom — presudan faktor za OEM i male do srednje kupce koje proizvođači celih rolni ne mogu opslužiti." },
    "Vertical integration": { sl: "Vertikalna integracija", sr: "Vertikalna integracija" },
    "Material and finished element from one accountable partner — not a chain of intermediaries.": { sl: "Material in končni element pri enem odgovornem partnerju — brez verige posrednikov.", sr: "Materijal i gotov element od jednog odgovornog partnera — bez lanca posrednika." },
    "Own development & lab": { sl: "Lasten razvoj in laboratorij", sr: "Sopstveni razvoj i laboratorija" },
    "Materials engineered and tested in-house for your exact working conditions.": { sl: "Materiali, zasnovani in preizkušeni interno za vaše natančne delovne pogoje.", sr: "Materijali projektovani i ispitani interno za vaše tačne radne uslove." },
    "132 years of continuity": { sl: "132 let neprekinjenega delovanja", sr: "132 godine kontinuiteta" },
    "Founded 1894 — stability that matters for long-term supply agreements.": { sl: "Ustanovljeni 1894 — stabilnost, ki šteje za dolgoročne dobavne pogodbe.", sr: "Osnovani 1894 — stabilnost koja je važna za dugoročne ugovore o snabdevanju." },
    "Group with SI + RS plants": { sl: "Skupina z obrati v SI in RS", sr: "Grupa sa pogonima u SI i RS" },
    "Konus S and Vulkan Protektor in Serbia — dual-location resilience and regional support.": { sl: "Konus S in Vulkan Protektor v Srbiji — odpornost dveh lokacij in regionalna podpora.", sr: "Konus S i Vulkan Protektor u Srbiji — otpornost dve lokacije i regionalna podrška." },

    // ============ home — proof gallery ============
    "Proof of manufacturing": { sl: "Dokaz proizvodnje", sr: "Dokaz proizvodnje" },
    "A real plant, not a catalogue.": { sl: "Pravi obrat, ne katalog.", sr: "Prava fabrika, ne katalog." },
    "Needle-punch lines, lamination, an in-house laboratory and quality control — under one roof in Slovenske Konjice.": { sl: "Iglane linije, laminacija, lasten laboratorij in nadzor kakovosti — pod eno streho v Slovenskih Konjicah.", sr: "Iglane linije, laminacija, sopstvena laboratorija i kontrola kvaliteta — pod jednim krovom u Slovenskim Konjicama." },
    "Needle-punch & filter lines": { sl: "Iglane in filtrske linije", sr: "Iglane i filter linije" },
    "Filter media": { sl: "Filtrirni mediji", sr: "Filtracijski mediji" },
    "Belt construction": { sl: "Konstrukcija trakov", sr: "Konstrukcija traka" },
    "Recycled fibre": { sl: "Reciklirana vlakna", sr: "Reciklirana vlakna" },

    // ============ home — quality ============
    "Quality & compliance": { sl: "Kakovost in skladnost", sr: "Kvalitet i usklađenost" },
    "Certified. Documented. Traceable.": { sl: "Certificirano. Dokumentirano. Sledljivo.", sr: "Sertifikovano. Dokumentovano. Sledljivo." },
    "Our processes and materials are aligned with international quality and environmental-management standards. Certificate scope and validity, plus declarations of conformity, are provided on request.": { sl: "Naši procesi in materiali so usklajeni z mednarodnimi standardi kakovosti in ravnanja z okoljem. Obseg in veljavnost certifikatov ter izjave o skladnosti posredujemo na zahtevo.", sr: "Naši procesi i materijali usklađeni su sa međunarodnim standardima kvaliteta i upravljanja životnom sredinom. Obim i važenje sertifikata, kao i izjave o usaglašenosti, dostavljamo na zahtev." },
    "Quality management": { sl: "Vodenje kakovosti", sr: "Upravljanje kvalitetom" },
    "Environmental mgmt.": { sl: "Ravnanje z okoljem", sr: "Upravljanje životnom sredinom" },
    "Environmental management": { sl: "Ravnanje z okoljem", sr: "Upravljanje životnom sredinom" },
    "Material testing": { sl: "Preizkušanje materialov", sr: "Ispitivanje materijala" },
    "Food-contact & substances": { sl: "Stik z živili in snovi", sr: "Kontakt s hranom i supstance" },

    // ============ inquiry blocks (home + product) ============
    "Tell us the application. We'll propose the material.": { sl: "Povejte nam aplikacijo. Predlagamo material.", sr: "Recite nam primenu. Predlažemo materijal." },
    "Send your operating conditions and quantities — our team replies within one business day with a material proposal and quote.": { sl: "Pošljite obratovalne pogoje in količine — naša ekipa odgovori v enem delovnem dnevu s predlogom materiala in ponudbo.", sr: "Pošaljite radne uslove i količine — naš tim odgovara u roku od jednog radnog dana sa predlogom materijala i ponudom." },
    "Full contact & offices": { sl: "Vsi kontakti in pisarne", sr: "Svi kontakti i kancelarije" },
    "Thank you for your inquiry.": { sl: "Hvala za povpraševanje.", sr: "Hvala na upitu." },
    "New application": { sl: "Nova prijava", sr: "Nova prijava" },

    // form field labels / options / consent
    "Program *": { sl: "Program *", sr: "Program *" },
    "Country *": { sl: "Država *", sr: "Zemlja *" },
    "Company *": { sl: "Podjetje *", sr: "Kompanija *" },
    "Name *": { sl: "Ime *", sr: "Ime *" },
    "Business e-mail *": { sl: "Poslovni e-naslov *", sr: "Poslovni e-mail *" },
    "Application & requirements": { sl: "Aplikacija in zahteve", sr: "Primena i zahtevi" },
    "Application": { sl: "Aplikacija", sr: "Primena" },
    "Industry": { sl: "Panoga", sr: "Industrija" },
    "Phone": { sl: "Telefon", sr: "Telefon" },
    "Quantity": { sl: "Količina", sr: "Količina" },
    "Needed by": { sl: "Potrebno do", sr: "Potrebno do" },
    "Belt type": { sl: "Tip traku", sr: "Tip trake" },
    "Product type": { sl: "Tip izdelka", sr: "Tip proizvoda" },
    "Other / not sure": { sl: "Drugo / nisem prepričan", sr: "Drugo / nisam siguran" },
    "Other": { sl: "Drugo", sr: "Drugo" },
    "Not urgent": { sl: "Ni nujno", sr: "Nije hitno" },
    "Within 4 weeks": { sl: "V 4 tednih", sr: "U roku od 4 nedelje" },
    "Within 2 weeks": { sl: "V 2 tednih", sr: "U roku od 2 nedelje" },
    "Urgent": { sl: "Nujno", sr: "Hitno" },
    "I consent to the processing of my data to handle this inquiry, per the": { sl: "Soglašam z obdelavo mojih podatkov za obravnavo tega povpraševanja, skladno s", sr: "Saglasan sam sa obradom mojih podataka radi obrade ovog upita, u skladu sa" },
    "Privacy Policy": { sl: "Politiko zasebnosti", sr: "Pravilima o privatnosti" },

    // ============ product page shared ============
    "See specifications": { sl: "Oglejte si specifikacije", sr: "Pogledajte specifikacije" },
    "Materials & specifications": { sl: "Materiali in specifikacije", sr: "Materijali i specifikacije" },
    "Substrates & specifications": { sl: "Nosilci in specifikacije", sr: "Nosači i specifikacije" },
    "Constructions & specifications": { sl: "Konstrukcije in specifikacije", sr: "Konstrukcije i specifikacije" },
    "Products & specifications": { sl: "Izdelki in specifikacije", sr: "Proizvodi i specifikacije" },
    "Types & specifications": { sl: "Tipi in specifikacije", sr: "Tipovi i specifikacije" },
    "Documentation": { sl: "Dokumentacija", sr: "Dokumentacija" },
    "Datasheets & declarations.": { sl: "Podatkovni listi in izjave.", sr: "Tehnički listovi i izjave." },
    "Datasheets & guides.": { sl: "Podatkovni listi in vodniki.", sr: "Tehnički listovi i vodiči." },
    "Datasheets & formats.": { sl: "Podatkovni listi in formati.", sr: "Tehnički listovi i formati." },
    "Sent to your business e-mail on request — no password wall.": { sl: "Poslano na vaš poslovni e-naslov na zahtevo — brez gesla.", sr: "Šaljemo na vaš poslovni e-mail na zahtev — bez lozinke." },
    "Common questions.": { sl: "Pogosta vprašanja.", sr: "Česta pitanja." },
    "Quality & compliance": { sl: "Kakovost in skladnost", sr: "Kvalitet i usklađenost" },
    "Certified processes.": { sl: "Certificirani procesi.", sr: "Sertifikovani procesi." },
    "Service & fabrication": { sl: "Storitve in izdelava", sr: "Servis i izrada" },

    // product hero eyebrows use brand names (kept). Product H1 headings:
    "Conveyor & power-transmission belts": { sl: "Transportni in pogonski trakovi", sr: "Transportne trake i prenos snage" },
    "Synthetic leather substrates": { sl: "Nosilci za sintetično usnje", sr: "Nosači za sintetičku kožu" },
    "Linings & technical laminates": { sl: "Podloge in tehnični laminati", sr: "Podstave i tehnički laminati" },

    // ============ contact page ============
    "Contact & RFQ": { sl: "Kontakt in povpraševanje", sr: "Kontakt i upit" },
    "Talk to the right team, the first time.": { sl: "Takoj se obrnite na pravo ekipo.", sr: "Obratite se pravom timu, iz prve." },
    "Send a full request for quotation and it routes to the responsible team — sales, engineering, export, procurement or quality. We reply within one business day.": { sl: "Pošljite celotno povpraševanje in usmerjeno bo k odgovorni ekipi — prodaja, inženiring, izvoz, nabava ali kakovost. Odgovorimo v enem delovnem dnevu.", sr: "Pošaljite kompletan upit za ponudu i biće prosleđen odgovornom timu — prodaja, inženjering, izvoz, nabavka ili kvalitet. Odgovaramo u roku od jednog radnog dana." },
    "Within 1 business day": { sl: "V enem delovnem dnevu", sr: "U roku od jednog radnog dana" },
    "Response-time commitment on every RFQ.": { sl: "Zaveza k odzivnemu času za vsako povpraševanje.", sr: "Obaveza o vremenu odgovora za svaki upit." },
    "Routed by program": { sl: "Usmerjeno po programu", sr: "Prosleđeno po programu" },
    "Your inquiry reaches the responsible team.": { sl: "Vaše povpraševanje doseže odgovorno ekipo.", sr: "Vaš upit stiže do odgovornog tima." },
    "Correspond in your language.": { sl: "Dopisujte se v svojem jeziku.", sr: "Dopisujte se na svom jeziku." },
    "One e-mail domain": { sl: "Ena e-poštna domena", sr: "Jedan e-mail domen" },
    "All contacts on @konuskonex.com.": { sl: "Vsi kontakti na @konuskonex.com.", sr: "Svi kontakti na @konuskonex.com." },
    "Departments": { sl: "Oddelki", sr: "Odeljenja" },
    "Reach the right desk directly.": { sl: "Obrnite se neposredno na pravo službo.", sr: "Obratite se direktno pravoj službi." },
    "Sales": { sl: "Prodaja", sr: "Prodaja" },
    "Quotes, orders and product selection.": { sl: "Ponudbe, naročila in izbor izdelkov.", sr: "Ponude, porudžbine i izbor proizvoda." },
    "Technical engineering": { sl: "Tehnični inženiring", sr: "Tehnički inženjering" },
    "Specifications, materials and applications.": { sl: "Specifikacije, materiali in aplikacije.", sr: "Specifikacije, materijali i primene." },
    "Export": { sl: "Izvoz", sr: "Izvoz" },
    "International orders, logistics, Incoterms.": { sl: "Mednarodna naročila, logistika, Incoterms.", sr: "Međunarodne porudžbine, logistika, Incoterms." },
    "Quality (QM)": { sl: "Kakovost (QM)", sr: "Kvalitet (QM)" },
    "Certificates, audits and supplier qualification.": { sl: "Certifikati, presoje in kvalifikacija dobaviteljev.", sr: "Sertifikati, provere i kvalifikacija dobavljača." },
    "Procurement": { sl: "Nabava", sr: "Nabavka" },
    "Supplier and raw-material inquiries.": { sl: "Povpraševanja glede dobaviteljev in surovin.", sr: "Upiti o dobavljačima i sirovinama." },
    "General": { sl: "Splošno", sr: "Opšte" },
    "Anything else — we'll direct you.": { sl: "Karkoli drugega — usmerimo vas.", sr: "Bilo šta drugo — uputićemo vas." },
    "WhatsApp": { sl: "WhatsApp", sr: "WhatsApp" },
    "Fast reply for the region": { sl: "Hiter odgovor za regijo", sr: "Brz odgovor za region" },
    "Request a callback": { sl: "Zahtevajte povratni klic", sr: "Zatražite povratni poziv" },
    "Leave your number in the form": { sl: "Pustite številko v obrazcu", sr: "Ostavite broj u obrascu" },
    "Book a consultation": { sl: "Rezervirajte posvet", sr: "Zakažite konsultaciju" },
    "Talk to an engineer": { sl: "Pogovorite se z inženirjem", sr: "Razgovarajte sa inženjerom" },
    "Request for quotation": { sl: "Povpraševanje za ponudbo", sr: "Zahtev za ponudu" },
    "One form, routed to the right team.": { sl: "En obrazec, usmerjen k pravi ekipi.", sr: "Jedan obrazac, prosleđen pravom timu." },
    "Give us the application and conditions and attach a drawing, spec or sample photo. The more you share, the faster and more accurate our proposal.": { sl: "Opišite aplikacijo in pogoje ter priložite risbo, specifikacijo ali fotografijo vzorca. Več ko delite, hitrejši in natančnejši je naš predlog.", sr: "Opišite primenu i uslove i priložite crtež, specifikaciju ili fotografiju uzorka. Što više podelite, brži i tačniji je naš predlog." },
    "Thank you — your RFQ is in.": { sl: "Hvala — vaše povpraševanje je prispelo.", sr: "Hvala — vaš upit je primljen." },
    "We've routed your request to the responsible team. You'll receive a reply within one business day with a material proposal and quote.": { sl: "Vašo zahtevo smo usmerili k odgovorni ekipi. Odgovor s predlogom materiala in ponudbo prejmete v enem delovnem dnevu.", sr: "Vaš zahtev smo prosledili odgovornom timu. Odgovor sa predlogom materijala i ponudom dobićete u roku od jednog radnog dana." },
    "Name": { sl: "Ime", sr: "Ime" },
    "Application & working conditions *": { sl: "Aplikacija in obratovalni pogoji *", sr: "Primena i radni uslovi *" },
    "Offices & locations": { sl: "Pisarne in lokacije", sr: "Kancelarije i lokacije" },
    "A group across Slovenia and Serbia.": { sl: "Skupina v Sloveniji in Srbiji.", sr: "Grupa u Sloveniji i Srbiji." },
    "Headquarters": { sl: "Sedež", sr: "Sedište" },
    "Group company · Serbia": { sl: "Družba skupine · Srbija", sr: "Kompanija grupe · Srbija" },
    "Synthetic leather & technical materials": { sl: "Sintetično usnje in tehnični materiali", sr: "Sintetička koža i tehnički materijali" },
    "Conveyor & power-transmission belts": { sl: "Transportni in pogonski trakovi", sr: "Transportne trake i prenos snage" },
    "Open in maps ↗": { sl: "Odpri v zemljevidu ↗", sr: "Otvori u mapama ↗" },

    // ============ certificates ============
    "Certificates & standards": { sl: "Certifikati in standardi", sr: "Sertifikati i standardi" },
    "We operate to international quality and environmental-management standards. Certificate copies, scope and validity, and declarations of conformity are provided on request.": { sl: "Delujemo skladno z mednarodnimi standardi kakovosti in ravnanja z okoljem. Kopije certifikatov, obseg in veljavnost ter izjave o skladnosti posredujemo na zahtevo.", sr: "Poslujemo u skladu sa međunarodnim standardima kvaliteta i upravljanja životnom sredinom. Kopije sertifikata, obim i važenje, kao i izjave o usaglašenosti dostavljamo na zahtev." },
    "Need a certificate copy?": { sl: "Potrebujete kopijo certifikata?", sr: "Potrebna vam je kopija sertifikata?" },
    "We send current certificates, scope and declarations of conformity to your business e-mail within one business day.": { sl: "Veljavne certifikate, obseg in izjave o skladnosti pošljemo na vaš poslovni e-naslov v enem delovnem dnevu.", sr: "Važeće sertifikate, obim i izjave o usaglašenosti šaljemo na vaš poslovni e-mail u roku od jednog radnog dana." },

    // ============ about ============
    "About us": { sl: "O nas", sr: "O nama" },
    "Company data": { sl: "Podatki o podjetju", sr: "Podaci o kompaniji" },
    "Where we are": { sl: "Kje smo", sr: "Gde se nalazimo" },

    // ============ sustainability ============
    "Sustainability": { sl: "Trajnost", sr: "Održivost" },
    "Our commitments": { sl: "Naše zaveze", sr: "Naše obaveze" },

    // ============ where we are ============
    "By road": { sl: "Po cesti", sr: "Putem" },
    "Group locations · Serbia": { sl: "Lokacije skupine · Srbija", sr: "Lokacije grupe · Srbija" },
    "Headquarters & plant": { sl: "Sedež in obrat", sr: "Sedište i pogon" },

    // ============ careers ============
    "Careers": { sl: "Kariera", sr: "Karijera" },
    "Where you can work": { sl: "Kje lahko delate", sr: "Gde možete raditi" },
    "Fields we hire in.": { sl: "Področja, za katera zaposlujemo.", sr: "Oblasti za koje zapošljavamo." },
    "Open application": { sl: "Odprta prijava", sr: "Otvorena prijava" },
    "Send application": { sl: "Pošljite prijavo", sr: "Pošaljite prijavu" },
    "Application received.": { sl: "Prijava prejeta.", sr: "Prijava primljena." },
    "E-mail *": { sl: "E-naslov *", sr: "E-mail *" },
    "Field of work": { sl: "Področje dela", sr: "Oblast rada" },
    "Message": { sl: "Sporočilo", sr: "Poruka" },

    // ============ news ============
    "News": { sl: "Novice", sr: "Vesti" },

    // ============ legal (headings) ============
    "Privacy policy": { sl: "Politika zasebnosti", sr: "Pravila o privatnosti" },
    "Terms of business": { sl: "Pogoji poslovanja", sr: "Uslovi poslovanja" },
    "Legal": { sl: "Pravno", sr: "Pravno" },

    // ============ document titles ============
    "Nonwoven technical textiles, industrial filtration & conveyor belts | Konus Konex, Slovenia": { sl: "Netkani tehnični tekstil, industrijska filtracija in transportni trakovi | Konus Konex, Slovenija", sr: "Netkani tehnički tekstil, industrijska filtracija i transportne trake | Konus Konex, Slovenija" },
    "Industrial filtration — filter media & filter bags (FILTECH / KOFIL) | Konus Konex": { sl: "Industrijska filtracija — filtrirni mediji in vreče (FILTECH / KOFIL) | Konus Konex", sr: "Industrijska filtracija — filtracijski mediji i vreće (FILTECH / KOFIL) | Konus Konex" },
    "Conveyor & power-transmission belts (Vulkan Protektor / NOVBELT) | Konus Konex": { sl: "Transportni in pogonski trakovi (Vulkan Protektor / NOVBELT) | Konus Konex", sr: "Transportne trake i prenos snage (Vulkan Protektor / NOVBELT) | Konus Konex" },
    "Synthetic leather substrates — nonwoven base materials (Konus S) | Konus Konex": { sl: "Nosilci za sintetično usnje — netkani osnovni materiali (Konus S) | Konus Konex", sr: "Nosači za sintetičku kožu — netkani osnovni materijali (Konus S) | Konus Konex" },
    "Technical cleaning materials — industrial wipes & nonwovens | Konus Konex": { sl: "Tehnični materiali za čiščenje — industrijske krpe in netkani materiali | Konus Konex", sr: "Tehnički materijali za čišćenje — industrijske krpe i netkani materijali | Konus Konex" },
    "Linings & technical textile laminates (FLATEX) | Konus Konex": { sl: "Podloge in tehnični tekstilni laminati (FLATEX) | Konus Konex", sr: "Podstave i tehnički tekstilni laminati (FLATEX) | Konus Konex" },
    "Contact & request a quote — sales, engineering, export | Konus Konex": { sl: "Kontakt in povpraševanje — prodaja, inženiring, izvoz | Konus Konex", sr: "Kontakt i upit — prodaja, inženjering, izvoz | Konus Konex" },
    "Certificates & standards | Konus Konex": { sl: "Certifikati in standardi | Konus Konex", sr: "Sertifikati i standardi | Konus Konex" },
    "About us — technical textile manufacturer since 1894 | Konus Konex": { sl: "O nas — proizvajalec tehničnega tekstila od 1894 | Konus Konex", sr: "O nama — proizvođač tehničkog tekstila od 1894 | Konus Konex" },
    "Sustainability — recycled fibres & responsible production | Konus Konex": { sl: "Trajnost — reciklirana vlakna in odgovorna proizvodnja | Konus Konex", sr: "Održivost — reciklirana vlakna i odgovorna proizvodnja | Konus Konex" },
    "Where we are — Slovenske Konjice, Slovenia | Konus Konex": { sl: "Kje smo — Slovenske Konjice, Slovenija | Konus Konex", sr: "Gde se nalazimo — Slovenske Konjice, Slovenija | Konus Konex" },
    "Careers — join a 132-year manufacturer | Konus Konex": { sl: "Kariera — pridružite se 132-letnemu proizvajalcu | Konus Konex", sr: "Karijera — pridružite se proizvođaču sa 132 godine | Konus Konex" },
    "News | Konus Konex": { sl: "Novice | Konus Konex", sr: "Vesti | Konus Konex" },
    "Privacy policy | Konus Konex": { sl: "Politika zasebnosti | Konus Konex", sr: "Pravila o privatnosti | Konus Konex" },
    "Terms of business | Konus Konex": { sl: "Pogoji poslovanja | Konus Konex", sr: "Uslovi poslovanja | Konus Konex" },

    // ============ input placeholders ============
    "@ph:e.g. Germany": { sl: "npr. Nemčija", sr: "npr. Nemačka" },
    "@ph:e.g. Italy": { sl: "npr. Italija", sr: "npr. Italija" },
    "@ph:e.g. Austria": { sl: "npr. Avstrija", sr: "npr. Austrija" },
    "@ph:Company name": { sl: "Naziv podjetja", sr: "Naziv kompanije" },
    "@ph:Contact person": { sl: "Kontaktna oseba", sr: "Kontakt osoba" },
    "@ph:Full name": { sl: "Polno ime", sr: "Ime i prezime" },
    "@ph:name@company.com": { sl: "ime@podjetje.com", sr: "ime@kompanija.com" },
    "@ph:name@example.com": { sl: "ime@primer.com", sr: "ime@primer.com" },
    "@ph:+ country code": { sl: "+ klicna koda", sr: "+ pozivni broj" },
    "@ph:e.g. 500 m² / 20 bags": { sl: "npr. 500 m² / 20 vreč", sr: "npr. 500 m² / 20 vreća" },
    "@ph:Material, working conditions, quantities, dimensions…": { sl: "Material, obratovalni pogoji, količine, dimenzije …", sr: "Materijal, radni uslovi, količine, dimenzije …" },
    "@ph:Temperature, dust/media, air volume, dimensions, quantity…": { sl: "Temperatura, prah/medij, volumen zraka, dimenzije, količina …", sr: "Temperatura, prašina/medij, zapremina vazduha, dimenzije, količina …" },
    "@ph:Belt width & length, pulley diameters, speed, load, temperature…": { sl: "Širina in dolžina traku, premeri jermenic, hitrost, obremenitev, temperatura …", sr: "Širina i dužina trake, prečnici koturova, brzina, opterećenje, temperatura …" },
    "@ph:Finished article, coating process, weight/thickness, quantity…": { sl: "Končni izdelek, postopek nanašanja, teža/debelina, količina …", sr: "Gotov artikal, proces nanošenja, težina/debljina, količina …" },
    "@ph:What you clean, format, sizes, packaging, quantity…": { sl: "Kaj čistite, format, dimenzije, embalaža, količina …", sr: "Šta čistite, format, dimenzije, pakovanje, količina …" },
    "@ph:Face material, backing, bond, end use, quantity…": { sl: "Vrhnji material, podloga, spoj, končna uporaba, količina …", sr: "Lice materijala, podloga, spoj, krajnja upotreba, količina …" },
    "@ph:Temperature, media/dust, dimensions, standard, existing sample…": { sl: "Temperatura, medij/prah, dimenzije, standard, obstoječi vzorec …", sr: "Temperatura, medij/prašina, dimenzije, standard, postojeći uzorak …" },
    "@ph:Briefly: experience, availability…": { sl: "Na kratko: izkušnje, razpoložljivost …", sr: "Ukratko: iskustvo, dostupnost …" },

    // ============ about (o-nama) ============
    "Headquartered in Slovenske Konjice, north-eastern Slovenia. Founded in 1894.": { sl: "Sedež v Slovenskih Konjicah, severovzhodna Slovenija. Ustanovljeno leta 1894.", sr: "Sedište u Slovenskim Konjicama, severoistočna Slovenija. Osnovano 1894. godine." },
    "Konus Konex is one of the leading manufacturers of technical nonwoven and woven textile materials for industry and household — and a leading producer of special engineered conveyor belts.": { sl: "Konus Konex je eden vodilnih proizvajalcev tehničnih netkanih in tkanih tekstilnih materialov za industrijo in gospodinjstvo — ter vodilni proizvajalec posebnih inženirskih transportnih trakov.", sr: "Konus Konex je jedan od vodećih proizvođača tehničkih netkanih i tkanih tekstilnih materijala za industriju i domaćinstvo — i vodeći proizvođač posebnih inženjerskih transportnih traka." },
    "The company is customer-oriented and committed to high-quality, customer-adapted engineered materials and products. Today Konus Konex is a group, with the parent company in Slovenia and subsidiaries Konus S and Vulkan Protektor in Serbia.": { sl: "Podjetje je usmerjeno k strankam in zavezano visokokakovostnim, po meri prilagojenim inženirskim materialom in izdelkom. Danes je Konus Konex skupina, z matičnim podjetjem v Sloveniji ter hčerinskima družbama Konus S in Vulkan Protektor v Srbiji.", sr: "Kompanija je orijentisana ka kupcima i posvećena visokokvalitetnim, po meri prilagođenim inženjerskim materijalima i proizvodima. Danas je Konus Konex grupa, sa matičnom kompanijom u Sloveniji i zavisnim društvima Konus S i Vulkan Protektor u Srbiji." },
    "Name & activity": { sl: "Naziv in dejavnost", sr: "Naziv i delatnost" },
    "Address": { sl: "Naslov", sr: "Adresa" },
    "Management": { sl: "Vodstvo", sr: "Rukovodstvo" },
    "Registration no.": { sl: "Matična številka", sr: "Matični broj" },
    "VAT no.": { sl: "Davčna številka", sr: "PIB / PDV broj" },
    "Legal form": { sl: "Pravna oblika", sr: "Pravni oblik" },
    "Group companies": { sl: "Družbe skupine", sr: "Kompanije grupe" },
    "Tradition since": { sl: "Tradicija od", sr: "Tradicija od" },
    "Production of nonwoven and woven materials, filters, power-transmission and conveyor belts": { sl: "Proizvodnja netkanih in tkanih materialov, filtrov, pogonskih in transportnih trakov", sr: "Proizvodnja netkanih i tkanih materijala, filtera, pogonskih i transportnih traka" },
    "Director: Leon Pekošak · Procurators: Aleš Grilj, Marko Grilj, Savo Grilj": { sl: "Direktor: Leon Pekošak · Prokuristi: Aleš Grilj, Marko Grilj, Savo Grilj", sr: "Direktor: Leon Pekošak · Prokuristi: Aleš Grilj, Marko Grilj, Savo Grilj" },
    "Limited liability company (d.o.o.) · private capital": { sl: "Družba z omejeno odgovornostjo (d.o.o.) · zasebni kapital", sr: "Društvo sa ograničenom odgovornošću (d.o.o.) · privatni kapital" },
    "Konus S (Serbia) · Vulkan Protektor (Serbia)": { sl: "Konus S (Srbija) · Vulkan Protektor (Srbija)", sr: "Konus S (Srbija) · Vulkan Protektor (Srbija)" },
    "157 · mid-size": { sl: "157 · srednje veliko", sr: "157 · srednje veličine" },
    "85% · 50+ countries": { sl: "85 % · 50+ držav", sr: "85% · 50+ zemalja" },

    // ============ sustainability (odrzivost) ============
    "Technical textiles made in the EU, with recycled fibres, controlled processes and materials engineered to last.": { sl: "Tehnični tekstil, izdelan v EU, z recikliranimi vlakni, nadzorovanimi procesi in materiali, zasnovanimi za dolgo življenjsko dobo.", sr: "Tehnički tekstil proizveden u EU, sa recikliranim vlaknima, kontrolisanim procesima i materijalima projektovanim da traju." },
    "Circular by construction": { sl: "Krožno po zasnovi", sr: "Kružno po konstrukciji" },
    "Recycled fibres, engineered value.": { sl: "Reciklirana vlakna, inženirska vrednost.", sr: "Reciklirana vlakna, inženjerska vrednost." },
    "Needle-punched nonwovens are inherently suited to recycled fibre. A significant share of our production programs uses recycled and regenerated fibres — turning textile by-products into filter media, substrates and technical felts with a documented second life.": { sl: "Iglani netkani materiali so že po naravi primerni za reciklirana vlakna. Znaten delež naših proizvodnih programov uporablja reciklirana in regenerirana vlakna — tekstilne stranske produkte spreminjamo v filtrirne medije, nosilce in tehnične klobučevine z dokumentiranim drugim življenjem.", sr: "Iglani netkani materijali su po svojoj prirodi pogodni za reciklirana vlakna. Značajan deo naših proizvodnih programa koristi reciklirana i regenerisana vlakna — tekstilne nusproizvode pretvaramo u filtracijske medije, nosače i tehničke filčeve sa dokumentovanim drugim životom." },
    "Under ISO 14001 we manage energy, water and waste across the plant, and our materials are engineered for long service life — the most direct way a technical textile reduces its footprint.": { sl: "V okviru ISO 14001 upravljamo energijo, vodo in odpadke v celotnem obratu, naši materiali pa so zasnovani za dolgo življenjsko dobo — najbolj neposreden način, kako tehnični tekstil zmanjša svoj odtis.", sr: "U okviru ISO 14001 upravljamo energijom, vodom i otpadom u celoj fabrici, a naši materijali su projektovani za dug vek trajanja — najdirektniji način na koji tehnički tekstil smanjuje svoj otisak." },
    "What we build the business on.": { sl: "Na čem gradimo poslovanje.", sr: "Na čemu gradimo poslovanje." },
    "Recycled-fibre programs": { sl: "Programi recikliranih vlaken", sr: "Programi recikliranih vlakana" },
    "Recycled and regenerated fibres in needle-punched products wherever the application allows.": { sl: "Reciklirana in regenerirana vlakna v iglanih izdelkih, kjer aplikacija to dopušča.", sr: "Reciklirana i regenerisana vlakna u iglanim proizvodima gde god primena to dozvoljava." },
    "ISO 14001 management": { sl: "Upravljanje ISO 14001", sr: "Upravljanje ISO 14001" },
    "Certified environmental-management system for energy, water and waste.": { sl: "Certificiran sistem ravnanja z okoljem za energijo, vodo in odpadke.", sr: "Sertifikovan sistem upravljanja životnom sredinom za energiju, vodu i otpad." },
    "Long-life materials": { sl: "Materiali z dolgo življenjsko dobo", sr: "Materijali dugog veka" },
    "Materials engineered to your conditions last longer in service — fewer replacements, less waste.": { sl: "Materiali, zasnovani za vaše pogoje, trajajo dlje v uporabi — manj zamenjav, manj odpadkov.", sr: "Materijali projektovani za vaše uslove traju duže u upotrebi — manje zamena, manje otpada." },
    "EU production, short chains": { sl: "Proizvodnja v EU, kratke verige", sr: "Proizvodnja u EU, kratki lanci" },
    "Production in Slovenia and Serbia keeps supply chains short for European customers.": { sl: "Proizvodnja v Sloveniji in Srbiji ohranja dobavne verige kratke za evropske kupce.", sr: "Proizvodnja u Sloveniji i Srbiji drži lance snabdevanja kratkim za evropske kupce." },
    "Sustainability documentation": { sl: "Dokumentacija o trajnosti", sr: "Dokumentacija o održivosti" },
    "Recycled-content statements, ISO 14001 scope and REACH declarations — on request, within one business day.": { sl: "Izjave o vsebnosti recikliranih materialov, obseg ISO 14001 in izjave REACH — na zahtevo, v enem delovnem dnevu.", sr: "Izjave o sadržaju recikliranih materijala, obim ISO 14001 i REACH izjave — na zahtev, u roku od jednog radnog dana." },

    // ============ where we are (gde-se-nalazimo) ============
    "Slovenske Konjice, north-eastern Slovenia — between Maribor and Celje, about 15 minutes from the A1 motorway.": { sl: "Slovenske Konjice, severovzhodna Slovenija — med Mariborom in Celjem, približno 15 minut od avtoceste A1.", sr: "Slovenske Konjice, severoistočna Slovenija — između Maribora i Celja, oko 15 minuta od autoputa A1." },
    "A1 motorway (Ljubljana–Maribor), exit Slovenske Konjice; ~15 min to the industrial zone. Maribor 35 km · Celje 25 km · Ljubljana 95 km · Graz (AT) 95 km · Zagreb (HR) 115 km.": { sl: "Avtocesta A1 (Ljubljana–Maribor), izvoz Slovenske Konjice; ~15 min do industrijske cone. Maribor 35 km · Celje 25 km · Ljubljana 95 km · Gradec (AT) 95 km · Zagreb (HR) 115 km.", sr: "Autoput A1 (Ljubljana–Maribor), izlaz Slovenske Konjice; ~15 min do industrijske zone. Maribor 35 km · Celje 25 km · Ljubljana 95 km · Grac (AT) 95 km · Zagreb (HR) 115 km." },
    "Konus S — synthetic leather & technical materials": { sl: "Konus S — sintetično usnje in tehnični materiali", sr: "Konus S — sintetička koža i tehnički materijali" },
    "Vulkan Protektor — conveyor & power-transmission belts": { sl: "Vulkan Protektor — transportni in pogonski trakovi", sr: "Vulkan Protektor — transportne trake i prenos snage" },
    "Visiting for an audit or a project?": { sl: "Nas obiščete zaradi presoje ali projekta?", sr: "Dolazite u posetu radi provere ili projekta?" },
    "Announce your visit and we prepare the plant tour, materials and the right people.": { sl: "Najavite obisk in pripravimo ogled obrata, materiale in prave sogovornike.", sr: "Najavite posetu i pripremićemo obilazak fabrike, materijale i prave sagovornike." },
    "Announce a visit": { sl: "Najavite obisk", sr: "Najavite posetu" },

    // ============ careers (karijera) ============
    "157 people build materials that run factories across 50+ countries. Join a manufacturer with 132 years of continuity — and small enough that your work is visible.": { sl: "157 ljudi izdeluje materiale, ki poganjajo tovarne v več kot 50 državah. Pridružite se proizvajalcu s 132 leti neprekinjenega delovanja — dovolj majhnemu, da je vaše delo vidno.", sr: "157 ljudi pravi materijale koji pokreću fabrike u više od 50 zemalja. Pridružite se proizvođaču sa 132 godine kontinuiteta — dovoljno malom da vaš rad bude vidljiv." },
    "Production & technology": { sl: "Proizvodnja in tehnologija", sr: "Proizvodnja i tehnologija" },
    "Machine operators, technologists, shift leads on needle-punch, lamination and confectioning lines.": { sl: "Upravljavci strojev, tehnologi, vodje izmen na iglanih, laminacijskih in konfekcijskih linijah.", sr: "Operateri mašina, tehnolozi, vođe smena na iglanim, laminacijskim i konfekcijskim linijama." },
    "Development & quality": { sl: "Razvoj in kakovost", sr: "Razvoj i kvalitet" },
    "Material development, laboratory testing and quality management (ISO 9001/14001).": { sl: "Razvoj materialov, laboratorijsko preizkušanje in vodenje kakovosti (ISO 9001/14001).", sr: "Razvoj materijala, laboratorijsko ispitivanje i upravljanje kvalitetom (ISO 9001/14001)." },
    "Sales & export": { sl: "Prodaja in izvoz", sr: "Prodaja i izvoz" },
    "Technical sales and export logistics for markets across 50+ countries.": { sl: "Tehnična prodaja in izvozna logistika za trge v več kot 50 državah.", sr: "Tehnička prodaja i izvozna logistika za tržišta u više od 50 zemalja." },
    "Support functions": { sl: "Podporne službe", sr: "Službe podrške" },
    "Procurement, finance, maintenance and administration.": { sl: "Nabava, finance, vzdrževanje in administracija.", sr: "Nabavka, finansije, održavanje i administracija." },
    "Stable, technical, close to home.": { sl: "Stabilno, tehnično, blizu doma.", sr: "Stabilno, tehnički, blizu kuće." },
    "Stability since 1894": { sl: "Stabilnost od 1894", sr: "Stabilnost od 1894" },
    "— a private group with production in Slovenia and Serbia, 85% export.": { sl: "— zasebna skupina s proizvodnjo v Sloveniji in Srbiji, 85 % izvoza.", sr: "— privatna grupa sa proizvodnjom u Sloveniji i Srbiji, 85% izvoza." },
    "Real engineering": { sl: "Pravi inženiring", sr: "Pravi inženjering" },
    "— own development, laboratory and vertically integrated production.": { sl: "— lasten razvoj, laboratorij in vertikalno integrirana proizvodnja.", sr: "— sopstveni razvoj, laboratorija i vertikalno integrisana proizvodnja." },
    "Growth on merit": { sl: "Napredovanje po zaslugah", sr: "Napredovanje po zasluzi" },
    "— 157 employees; visible work, mentoring and internal advancement.": { sl: "— 157 zaposlenih; vidno delo, mentorstvo in interno napredovanje.", sr: "— 157 zaposlenih; vidljiv rad, mentorstvo i interno napredovanje." },
    "Location": { sl: "Lokacija", sr: "Lokacija" },
    "— Slovenske Konjice, 15 min from the A1, commutable from Maribor and Celje.": { sl: "— Slovenske Konjice, 15 min od A1, dosegljivo iz Maribora in Celja.", sr: "— Slovenske Konjice, 15 min od A1, dostupno iz Maribora i Celja." },
    "No open positions listed right now — send an open application and we'll contact you when a role matches.": { sl: "Trenutno ni objavljenih prostih mest — pošljite odprto prijavo in vas kontaktiramo, ko se pojavi ustrezno delovno mesto.", sr: "Trenutno nema otvorenih pozicija — pošaljite otvorenu prijavu i kontaktiraćemo vas kada se pojavi odgovarajuća pozicija." },
    "Thank you for your interest. We keep open applications on file and contact you when a matching role opens.": { sl: "Hvala za zanimanje. Odprte prijave hranimo in vas kontaktiramo, ko se odpre ustrezno mesto.", sr: "Hvala na interesovanju. Otvorene prijave čuvamo i kontaktiramo vas kada se otvori odgovarajuća pozicija." },
    "Attach CV": { sl: "Priložite življenjepis", sr: "Priložite CV" },
    "No file selected": { sl: "Nobena datoteka ni izbrana", sr: "Nijedan fajl nije izabran" },
    "I consent to the processing of my data for recruitment purposes, per the": { sl: "Soglašam z obdelavo mojih podatkov za namene zaposlovanja, skladno s", sr: "Saglasan sam sa obradom mojih podataka u svrhu zapošljavanja, u skladu sa" },
    "Or e-mail": { sl: "Ali pišite na e-naslov", sr: "Ili pišite na e-mail" },
    "directly.": { sl: "neposredno.", sr: "direktno." },
    "Attach drawing / spec / sample": { sl: "Priložite risbo / specifikacijo / vzorec", sr: "Priložite crtež / specifikaciju / uzorak" },

    // ============ news (vesti) ============
    "Trade fairs, product developments and company announcements.": { sl: "Sejmi, razvoj izdelkov in obvestila podjetja.", sr: "Sajmovi, razvoj proizvoda i obaveštenja kompanije." },
    "Trade fair · 30 Jun – 2 Jul 2026": { sl: "Sejem · 30. jun – 2. jul 2026", sr: "Sajam · 30. jun – 2. jul 2026" },
    "Meet us at FILTECH, Cologne": { sl: "Obiščite nas na sejmu FILTECH v Kölnu", sr: "Posetite nas na sajmu FILTECH u Kelnu" },
    "30 June – 2 July 2026, Cologne (Germany). Visit our stand to discuss filter media, KOFIL elements and antistatic AGT-BT for ATEX zones. Book a meeting in advance.": { sl: "30. junij – 2. julij 2026, Köln (Nemčija). Obiščite naš razstavni prostor za pogovor o filtrirnih medijih, elementih KOFIL in antistatičnem AGT-BT za cone ATEX. Sestanek rezervirajte vnaprej.", sr: "30. jun – 2. jul 2026, Keln (Nemačka). Posetite naš štand za razgovor o filtracijskim medijima, KOFIL elementima i antistatičkom AGT-BT za ATEX zone. Zakažite sastanak unapred." },
    "Book a meeting": { sl: "Rezervirajte sestanek", sr: "Zakažite sastanak" },
    "Sustainability · placeholder": { sl: "Trajnost · začasno", sr: "Održivost · privremeno" },
    "Expanding recycled-fibre programs": { sl: "Širimo programe recikliranih vlaken", sr: "Širimo programe recikliranih vlakana" },
    "A growing share of our needle-punched programs now runs on recycled and regenerated fibres, with recycled-content statements available per article.": { sl: "Vse večji delež naših iglanih programov temelji na recikliranih in regeneriranih vlaknih, izjave o vsebnosti recikliranih materialov pa so na voljo za vsak izdelek.", sr: "Sve veći deo naših iglanih programa zasniva se na recikliranim i regenerisanim vlaknima, uz izjave o sadržaju recikliranih materijala dostupne po artiklu." },
    "Read about sustainability": { sl: "Preberite o trajnosti", sr: "Pročitajte o održivosti" },
    "Product · placeholder": { sl: "Izdelek · začasno", sr: "Proizvod · privremeno" },
    "Extended food-grade belt range": { sl: "Razširjena ponudba trakov za živila", sr: "Proširena ponuda traka za kontakt s hranom" },
    "New PU constructions for food processing lines, compliant with EU 1935/2004 — available with cleats and sidewalls, spliced endless.": { sl: "Nove konstrukcije PU za linije predelave živil, skladne z EU 1935/2004 — na voljo z rebri in stranicami, brezkončno spojene.", sr: "Nove PU konstrukcije za linije prerade hrane, usklađene sa EU 1935/2004 — dostupne sa rebrima i bočnim stranicama, beskonačno spojene." },
    "See the belt program": { sl: "Oglejte si program trakov", sr: "Pogledajte program traka" },
    "These are placeholder entries showing the news layout — replace with your real announcements, dates and photos.": { sl: "To so začasni vnosi, ki prikazujejo postavitev novic — nadomestite jih z resničnimi obvestili, datumi in fotografijami.", sr: "Ovo su privremeni unosi koji prikazuju izgled vesti — zamenite ih stvarnim obaveštenjima, datumima i fotografijama." },

    // ============ legal shared ============
    "Konus Konex d.o.o. · Last updated: template — review with counsel": { sl: "Konus Konex d.o.o. · Zadnja posodobitev: predloga — pregledati s pravnim svetovalcem", sr: "Konus Konex d.o.o. · Poslednje ažuriranje: šablon — proveriti sa pravnim savetnikom" },
    "Note:": { sl: "Opomba:", sr: "Napomena:" },
    "this is a template text prepared for the redesign — have it reviewed by your legal counsel before publication.": { sl: "to je vzorčno besedilo, pripravljeno za prenovo — pred objavo naj ga pregleda vaš pravni svetovalec.", sr: "ovo je šablonski tekst pripremljen za redizajn — pre objave neka ga pregleda vaš pravni savetnik." },

    // ============ privacy policy ============
    "1. Controller": { sl: "1. Upravljavec", sr: "1. Rukovalac" },
    "The controller of your personal data is Konus Konex d.o.o., Industrijska cesta 7, SI-3210 Slovenske Konjice, Slovenia (reg. no. 5490227, VAT SI65406664). Contact:": { sl: "Upravljavec vaših osebnih podatkov je Konus Konex d.o.o., Industrijska cesta 7, SI-3210 Slovenske Konjice, Slovenija (matična št. 5490227, davčna št. SI65406664). Kontakt:", sr: "Rukovalac vašim ličnim podacima je Konus Konex d.o.o., Industrijska cesta 7, SI-3210 Slovenske Konjice, Slovenija (matični br. 5490227, PIB SI65406664). Kontakt:" },
    "2. What we process and why": { sl: "2. Kaj obdelujemo in zakaj", sr: "2. Šta obrađujemo i zašto" },
    "We process personal data you provide through our inquiry and RFQ forms (name, company, country, e-mail, phone, message content and attachments) to respond to your inquiry, prepare quotations and conduct business correspondence — on the legal basis of taking steps prior to entering into a contract (Art. 6(1)(b) GDPR) and our legitimate interest in responding to business inquiries (Art. 6(1)(f)).": { sl: "Osebne podatke, ki jih posredujete prek naših obrazcev za povpraševanje in RFQ (ime, podjetje, država, e-naslov, telefon, vsebina sporočila in priloge), obdelujemo za odgovor na vaše povpraševanje, pripravo ponudb in poslovno korespondenco — na pravni podlagi izvajanja ukrepov pred sklenitvijo pogodbe (čl. 6(1)(b) GDPR) in našega zakonitega interesa za odgovarjanje na poslovna povpraševanja (čl. 6(1)(f)).", sr: "Lične podatke koje dostavljate putem naših obrazaca za upit i RFQ (ime, kompanija, država, e-mail, telefon, sadržaj poruke i prilozi) obrađujemo radi odgovora na vaš upit, pripreme ponuda i poslovne korespondencije — na pravnom osnovu preduzimanja radnji pre zaključenja ugovora (čl. 6(1)(b) GDPR) i našeg legitimnog interesa za odgovaranje na poslovne upite (čl. 6(1)(f))." },
    "Career applications (CV, contact data) are processed for recruitment on the basis of your consent (Art. 6(1)(a)) and pre-contractual steps.": { sl: "Prijave za zaposlitev (življenjepis, kontaktni podatki) obdelujemo za namene zaposlovanja na podlagi vaše privolitve (čl. 6(1)(a)) in predpogodbenih ukrepov.", sr: "Prijave za posao (CV, kontakt podaci) obrađujemo u svrhu zapošljavanja na osnovu vaše saglasnosti (čl. 6(1)(a)) i predugovornih radnji." },
    "3. Retention": { sl: "3. Hramba", sr: "3. Čuvanje" },
    "Inquiry data is kept for the duration of the business relationship or as long as needed to handle the inquiry, and thereafter per statutory retention obligations. Open job applications are kept up to 12 months unless you request earlier deletion.": { sl: "Podatke iz povpraševanj hranimo za čas poslovnega razmerja oziroma toliko časa, kolikor je potrebno za obravnavo povpraševanja, nato pa skladno z zakonskimi obveznostmi hrambe. Odprte prijave za zaposlitev hranimo do 12 mesecev, razen če zahtevate predčasen izbris.", sr: "Podatke iz upita čuvamo za vreme trajanja poslovnog odnosa ili onoliko koliko je potrebno za obradu upita, a nakon toga u skladu sa zakonskim obavezama čuvanja. Otvorene prijave za posao čuvamo do 12 meseci, osim ako zatražite ranije brisanje." },
    "4. Recipients": { sl: "4. Prejemniki", sr: "4. Primaoci" },
    "Data may be shared within the Konus Konex group (Konus S, Vulkan Protektor) where needed to handle your inquiry, and with IT and hosting providers acting as processors. We do not sell personal data. Transfers outside the EU/EEA occur only with appropriate safeguards.": { sl: "Podatke lahko delimo znotraj skupine Konus Konex (Konus S, Vulkan Protektor), kadar je to potrebno za obravnavo vašega povpraševanja, ter s ponudniki IT in gostovanja, ki delujejo kot obdelovalci. Osebnih podatkov ne prodajamo. Prenosi izven EU/EGP potekajo le z ustreznimi zaščitnimi ukrepi.", sr: "Podatke možemo deliti unutar grupe Konus Konex (Konus S, Vulkan Protektor) kada je potrebno za obradu vašeg upita, kao i sa IT i hosting provajderima koji deluju kao obrađivači. Ne prodajemo lične podatke. Prenosi izvan EU/EEP odvijaju se samo uz odgovarajuće zaštitne mere." },
    "5. Your rights": { sl: "5. Vaše pravice", sr: "5. Vaša prava" },
    "You have the right of access, rectification, erasure, restriction, data portability and objection, and the right to withdraw consent at any time. Contact": { sl: "Imate pravico do dostopa, popravka, izbrisa, omejitve, prenosljivosti podatkov in ugovora ter pravico do preklica privolitve kadar koli. Kontakt:", sr: "Imate pravo pristupa, ispravke, brisanja, ograničenja, prenosivosti podataka i prigovora, kao i pravo da povučete saglasnost u bilo kom trenutku. Kontakt:" },
    ". You may lodge a complaint with the Slovenian Information Commissioner (IP RS).": { sl: ". Pritožbo lahko vložite pri Informacijskem pooblaščencu RS (IP RS).", sr: ". Pritužbu možete podneti Povereniku za informacije Slovenije (IP RS)." },
    "6. Cookies": { sl: "6. Piškotki", sr: "6. Kolačići" },
    "This website uses only technically necessary storage (e.g. your language preference). No advertising or analytics cookies are set without your consent.": { sl: "To spletno mesto uporablja le tehnično nujno shranjevanje (npr. vašo jezikovno nastavitev). Brez vaše privolitve ne nastavljamo oglaševalskih ali analitičnih piškotkov.", sr: "Ovaj sajt koristi samo tehnički neophodno skladištenje (npr. vaš izbor jezika). Bez vaše saglasnosti ne postavljamo reklamne ni analitičke kolačiće." },

    // ============ terms of business ============
    "1. Scope": { sl: "1. Področje uporabe", sr: "1. Područje primene" },
    "These general terms apply to all quotations, orders and deliveries of Konus Konex d.o.o. unless otherwise agreed in writing. Deviating buyer terms apply only with our express written confirmation.": { sl: "Ti splošni pogoji veljajo za vse ponudbe, naročila in dobave družbe Konus Konex d.o.o., razen če je pisno dogovorjeno drugače. Odstopajoči pogoji kupca veljajo le z našo izrecno pisno potrditvijo.", sr: "Ovi opšti uslovi važe za sve ponude, porudžbine i isporuke kompanije Konus Konex d.o.o., osim ako je pisano dogovoreno drugačije. Odstupajući uslovi kupca važe samo uz našu izričitu pisanu potvrdu." },
    "2. Quotations & specifications": { sl: "2. Ponudbe in specifikacije", sr: "2. Ponude i specifikacije" },
    "Quotations are valid for the period stated therein. Published technical data (weights, temperatures, permeabilities and similar) are indicative ranges; the binding specification is confirmed per order in the order confirmation or technical datasheet.": { sl: "Ponudbe veljajo za obdobje, navedeno v njih. Objavljeni tehnični podatki (teže, temperature, prepustnosti in podobno) so okvirni razponi; zavezujoča specifikacija se potrdi za vsako naročilo v potrditvi naročila ali tehničnem podatkovnem listu.", sr: "Ponude važe za period naveden u njima. Objavljeni tehnički podaci (težine, temperature, propustljivosti i slično) su okvirni rasponi; obavezujuća specifikacija se potvrđuje po porudžbini u potvrdi porudžbine ili tehničkom listu." },
    "3. Orders & custom production": { sl: "3. Naročila in proizvodnja po meri", sr: "3. Porudžbine i proizvodnja po meri" },
    "Orders are binding upon our written order confirmation. For custom-engineered materials and confectioned products, agreed tolerances on dimensions and quantity (industry-standard over/under-run) apply.": { sl: "Naročila so zavezujoča z našo pisno potrditvijo naročila. Za inženirsko prilagojene materiale in konfekcionirane izdelke veljajo dogovorjene tolerance glede dimenzij in količine (industrijsko običajni presežek/primanjkljaj).", sr: "Porudžbine su obavezujuće nakon naše pisane potvrde porudžbine. Za inženjerski prilagođene materijale i konfekcionisane proizvode važe dogovorene tolerancije dimenzija i količine (industrijski uobičajen višak/manjak)." },
    "4. Delivery & Incoterms": { sl: "4. Dobava in Incoterms", sr: "4. Isporuka i Incoterms" },
    "Delivery terms are agreed per order under Incoterms 2020 (default EXW Slovenske Konjice unless otherwise confirmed). Delivery periods run from order confirmation and receipt of all technical details.": { sl: "Pogoji dobave se dogovorijo za vsako naročilo po Incoterms 2020 (privzeto EXW Slovenske Konjice, razen če je potrjeno drugače). Dobavni roki tečejo od potrditve naročila in prejema vseh tehničnih podatkov.", sr: "Uslovi isporuke se dogovaraju po porudžbini prema Incoterms 2020 (podrazumevano EXW Slovenske Konjice, osim ako je potvrđeno drugačije). Rokovi isporuke teku od potvrde porudžbine i prijema svih tehničkih podataka." },
    "5. Prices & payment": { sl: "5. Cene in plačilo", sr: "5. Cene i plaćanje" },
    "Prices are net, excluding VAT, packaging and transport unless stated otherwise. Payment terms are defined in the quotation or order confirmation. Goods remain our property until paid in full.": { sl: "Cene so neto, brez DDV, embalaže in prevoza, razen če je navedeno drugače. Plačilni pogoji so opredeljeni v ponudbi ali potrditvi naročila. Blago ostane naša last do celotnega plačila.", sr: "Cene su neto, bez PDV-a, pakovanja i transporta, osim ako je navedeno drugačije. Uslovi plaćanja definisani su u ponudi ili potvrdi porudžbine. Roba ostaje naše vlasništvo do potpune isplate." },
    "6. Warranty & complaints": { sl: "6. Garancija in reklamacije", sr: "6. Garancija i reklamacije" },
    "We warrant conformity with the confirmed specification. Visible defects must be notified in writing within 8 days of receipt; hidden defects promptly upon discovery. Our liability is limited to replacement or credit of the defective goods; suitability for a specific process remains the buyer's responsibility where operating conditions were not fully disclosed.": { sl: "Jamčimo skladnost s potrjeno specifikacijo. Vidne napake je treba pisno sporočiti v 8 dneh od prejema; skrite napake nemudoma ob odkritju. Naša odgovornost je omejena na zamenjavo ali dobropis blaga z napako; ustreznost za določen proces ostaja odgovornost kupca, kadar obratovalni pogoji niso bili v celoti razkriti.", sr: "Garantujemo usaglašenost sa potvrđenom specifikacijom. Vidljivi nedostaci moraju se prijaviti pisano u roku od 8 dana od prijema; skriveni nedostaci odmah po otkrivanju. Naša odgovornost je ograničena na zamenu ili odobrenje za robu sa nedostatkom; pogodnost za određeni proces ostaje odgovornost kupca kada radni uslovi nisu u potpunosti otkriveni." },
    "7. Governing law": { sl: "7. Veljavno pravo", sr: "7. Merodavno pravo" },
    "Slovenian law applies, excluding CISG conflict rules where agreed. Place of jurisdiction is the competent court for Slovenske Konjice, unless mandatory law provides otherwise.": { sl: "Uporablja se slovensko pravo, z izključitvijo kolizijskih pravil CISG, kadar je tako dogovorjeno. Kraj pristojnosti je pristojno sodišče za Slovenske Konjice, razen če prisilno pravo določa drugače.", sr: "Primenjuje se slovenačko pravo, uz isključenje kolizionih pravila CISG kada je tako dogovoreno. Mesto nadležnosti je nadležni sud za Slovenske Konjice, osim ako prinudno pravo ne predviđa drugačije." },

    // ============ product · shared (applies across product pages) ============
    "Brands · FILTECH · KOFIL": { sl: "Znamke · FILTECH · KOFIL", sr: "Brendovi · FILTECH · KOFIL" },
    "Brands · Vulkan Protektor · NOVBELT · FLATEX": { sl: "Znamke · Vulkan Protektor · NOVBELT · FLATEX", sr: "Brendovi · Vulkan Protektor · NOVBELT · FLATEX" },
    "Brand · KONUS S": { sl: "Znamka · KONUS S", sr: "Brend · KONUS S" },
    "Program · Technical wipes": { sl: "Program · Tehnične krpe", sr: "Program · Tehničke krpe" },
    "Brand · FLATEX": { sl: "Znamka · FLATEX", sr: "Brend · FLATEX" },
    "Environment": { sl: "Okolje", sr: "Životna sredina" },
    "Food-contact": { sl: "Stik z živili", sr: "Kontakt s hranom" },
    "Weight (g/m²)": { sl: "Teža (g/m²)", sr: "Težina (g/m²)" },
    "Fibre": { sl: "Vlakno", sr: "Vlakno" },
    "Media": { sl: "Medij", sr: "Medij" },
    "Filter media and KOFIL bags.": { sl: "Filtrirni mediji in vreče KOFIL.", sr: "Filtracijski mediji i KOFIL vreće." },
    "Engineered belts, made to spec.": { sl: "Inženirski trakovi, izdelani po specifikaciji.", sr: "Inženjerske trake, izrađene po specifikaciji." },
    "Technical textile laminates.": { sl: "Tehnični tekstilni laminati.", sr: "Tehnički tekstilni laminati." },
    "Technical nonwovens for professional cleaning.": { sl: "Tehnični netkani materiali za profesionalno čiščenje.", sr: "Tehnički netkani materijali za profesionalno čišćenje." },
    "Technical cleaning nonwovens.": { sl: "Tehnični netkani materiali za čiščenje.", sr: "Tehnički netkani materijali za čišćenje." },
    "Nonwoven substrates.": { sl: "Netkani nosilci.", sr: "Netkani nosači." },

    // ============ product · industrial filtration ============
    "Needle-felt filter media, finished KOFIL filter bags and elements for separating solid particles from air and liquids — engineered to your temperature, chemical resistance and filtration efficiency.": { sl: "Iglani filtrirni mediji, izdelane filtrske vreče KOFIL in elementi za ločevanje trdnih delcev iz zraka in tekočin — zasnovani za vašo temperaturo, kemično odpornost in učinkovitost filtracije.", sr: "Iglani filtracijski mediji, gotove KOFIL filter vreće i elementi za odvajanje čvrstih čestica iz vazduha i tečnosti — projektovani za vašu temperaturu, hemijsku otpornost i efikasnost filtracije." },
    "Where our media and elements are used.": { sl: "Kje se uporabljajo naši mediji in elementi.", sr: "Gde se koriste naši mediji i elementi." },
    "Industrial dedusting": { sl: "Industrijsko odpraševanje", sr: "Industrijsko otprašivanje" },
    "Baghouse and cartridge dedusting in cement, wood, metallurgy and minerals.": { sl: "Odpraševanje z vrečami in kartušami v cementni, lesni, metalurški in mineralni industriji.", sr: "Otprašivanje sa vrećastim i kertridž filterima u cementnoj, drvnoj, metalurškoj i mineralnoj industriji." },
    "Filter bags & cassettes": { sl: "Filtrske vreče in kasete", sr: "Filter vreće i kasete" },
    "Finished KOFIL bags, cages and cassettes confectioned to your housing.": { sl: "Izdelane vreče, koši in kasete KOFIL, konfekcionirani za vaše ohišje.", sr: "Gotove KOFIL vreće, korpe i kasete konfekcionisane za vaše kućište." },
    "Air-handling elements": { sl: "Elementi za obdelavo zraka", sr: "Elementi za obradu vazduha" },
    "Panel and pocket media for HVAC and process-air units, ISO 16890 classified.": { sl: "Panelni in žepni mediji za HVAC in enote procesnega zraka, klasificirani po ISO 16890.", sr: "Panelni i džepni mediji za HVAC i jedinice procesnog vazduha, klasifikovani po ISO 16890." },
    "Liquid filtration": { sl: "Filtracija tekočin", sr: "Filtracija tečnosti" },
    "Media for clarification and solid separation in liquid processes.": { sl: "Mediji za bistrenje in ločevanje trdnih snovi v tekočinskih procesih.", sr: "Mediji za bistrenje i odvajanje čvrstih materija u tečnim procesima." },
    "Filter media selection guide.": { sl: "Vodnik za izbiro filtrirnih medijev.", sr: "Vodič za izbor filtracijskih medija." },
    "Indicative ranges for standard needle-felt media. Final specification is confirmed per order.": { sl: "Okvirni razponi za standardne iglane medije. Končna specifikacija se potrdi za vsako naročilo.", sr: "Okvirni rasponi za standardne iglane medije. Konačna specifikacija se potvrđuje po porudžbini." },
    "Temp. cont./peak": { sl: "Temp. trajna/vrh", sr: "Temp. trajna/vrh" },
    "Air perm. (l/m²·s)": { sl: "Zračna prep. (l/m²·s)", sr: "Propustljivost (l/m²·s)" },
    "Chem. resistance": { sl: "Kem. odpornost", sr: "Hem. otpornost" },
    "PP — polypropylene": { sl: "PP — polipropilen", sr: "PP — polipropilen" },
    "Coarse–ePM10": { sl: "Grobo–ePM10", sr: "Grubo–ePM10" },
    "Acids ●●● · Alkalis ●●●": { sl: "Kisline ●●● · Baze ●●●", sr: "Kiseline ●●● · Baze ●●●" },
    "PES — polyester": { sl: "PES — poliester", sr: "PES — poliester" },
    "Acids ●● · Alkalis ●●": { sl: "Kisline ●● · Baze ●●", sr: "Kiseline ●● · Baze ●●" },
    "PAN — acrylic": { sl: "PAN — akril", sr: "PAN — akril" },
    "Hydrolysis ●●●": { sl: "Hidroliza ●●●", sr: "Hidroliza ●●●" },
    "Thermal ●●●": { sl: "Termično ●●●", sr: "Termički ●●●" },
    "PTFE-membrane laminate": { sl: "Laminat s PTFE-membrano", sr: "Laminat sa PTFE membranom" },
    "+ membrane": { sl: "+ membrana", sr: "+ membrana" },
    "per base": { sl: "po osnovi", sr: "po osnovi" },
    "low": { sl: "nizko", sr: "nisko" },
    "Surface filtration": { sl: "Površinska filtracija", sr: "Površinska filtracija" },
    "Antistatic AGT-BT": { sl: "Antistatični AGT-BT", sr: "Antistatički AGT-BT" },
    "+ conductive grid": { sl: "+ prevodna mreža", sr: "+ provodna mreža" },
    "ATEX zones · DEKRA EXAM": { sl: "Cone ATEX · DEKRA EXAM", sr: "ATEX zone · DEKRA EXAM" },
    "ISO 16890 replaces EN 779": { sl: "ISO 16890 nadomešča EN 779", sr: "ISO 16890 zamenjuje EN 779" },
    "EN 779 (classes G2–F9) was withdrawn in 2018 and replaced by ISO 16890. We classify all air-filtration media to ISO 16890. Indicative conversion:": { sl: "EN 779 (razredi G2–F9) je bil leta 2018 umaknjen in nadomeščen z ISO 16890. Vse medije za filtracijo zraka klasificiramo po ISO 16890. Okvirna pretvorba:", sr: "EN 779 (klase G2–F9) povučen je 2018. i zamenjen standardom ISO 16890. Sve medije za filtraciju vazduha klasifikujemo po ISO 16890. Okvirna konverzija:" },
    "Coarse": { sl: "Grobo", sr: "Grubo" },
    "Konus Konex operates to international quality and environmental-management standards. Antistatic AGT-BT media carry a DEKRA EXAM certificate for use in ATEX zones. Declarations of conformity to EU 1935/2004 and 10/2011 for food-contact applications, and REACH, are provided on request.": { sl: "Konus Konex deluje skladno z mednarodnimi standardi kakovosti in ravnanja z okoljem. Antistatični mediji AGT-BT imajo certifikat DEKRA EXAM za uporabo v conah ATEX. Izjave o skladnosti z EU 1935/2004 in 10/2011 za aplikacije v stiku z živili ter REACH posredujemo na zahtevo.", sr: "Konus Konex posluje u skladu sa međunarodnim standardima kvaliteta i upravljanja životnom sredinom. Antistatički mediji AGT-BT poseduju DEKRA EXAM sertifikat za upotrebu u ATEX zonama. Izjave o usaglašenosti sa EU 1935/2004 i 10/2011 za primene u kontaktu s hranom, kao i REACH, dostavljamo na zahtev." },
    "Datasheets are sent to your business e-mail — no password wall. Request below and receive them immediately.": { sl: "Podatkovne liste pošljemo na vaš poslovni e-naslov — brez gesla. Zahtevajte spodaj in jih takoj prejmete.", sr: "Tehničke listove šaljemo na vaš poslovni e-mail — bez lozinke. Zatražite ispod i odmah ih primite." },
    "Filter media datasheet — PP / PES / PAN": { sl: "Podatkovni list filtrirnih medijev — PP / PES / PAN", sr: "Tehnički list filtracijskih medija — PP / PES / PAN" },
    "Standard needle-felt media · request": { sl: "Standardni iglani mediji · zahteva", sr: "Standardni iglani mediji · zahtev" },
    "High-temp media — meta-aramid & PPS": { sl: "Visokotemperaturni mediji — meta-aramid in PPS", sr: "Visokotemperaturni mediji — meta-aramid i PPS" },
    "Up to 240 °C peak · request": { sl: "Do 240 °C vrh · zahteva", sr: "Do 240 °C vrh · zahtev" },
    "KOFIL filter-bag dimensioning guide": { sl: "Vodnik za dimenzioniranje filtrskih vreč KOFIL", sr: "Vodič za dimenzionisanje KOFIL filter vreća" },
    "Bag & cage sizing · request": { sl: "Dimenzije vreč in košev · zahteva", sr: "Dimenzije vreća i korpi · zahtev" },
    "Chemical resistance & ISO 16890 guide": { sl: "Vodnik za kemično odpornost in ISO 16890", sr: "Vodič za hemijsku otpornost i ISO 16890" },
    "Selection reference · request": { sl: "Referenca za izbiro · zahteva", sr: "Referenca za izbor · zahtev" },
    "Don't see your answer? Our filtration engineers reply within one business day.": { sl: "Ne najdete odgovora? Naši inženirji za filtracijo odgovorijo v enem delovnem dnevu.", sr: "Ne vidite odgovor? Naši inženjeri za filtraciju odgovaraju u roku od jednog radnog dana." },
    "What temperature can your filter media handle?": { sl: "Katero temperaturo prenesejo vaši filtrirni mediji?", sr: "Koju temperaturu podnose vaši filtracijski mediji?" },
    "Standard PP media run to ~90 °C, polyester to ~150 °C peak, PAN to ~140 °C, and high-temperature meta-aramid and PPS media to 200–240 °C peak. We match the medium to your continuous and peak process temperatures.": { sl: "Standardni mediji PP delujejo do ~90 °C, poliester do ~150 °C vrh, PAN do ~140 °C, visokotemperaturni mediji meta-aramid in PPS pa do 200–240 °C vrh. Medij prilagodimo vašim trajnim in vršnim procesnim temperaturam.", sr: "Standardni PP mediji rade do ~90 °C, poliester do ~150 °C vrh, PAN do ~140 °C, a visokotemperaturni meta-aramid i PPS mediji do 200–240 °C vrh. Medij prilagođavamo vašim trajnim i vršnim procesnim temperaturama." },
    "Do you make finished filter bags, or only media?": { sl: "Izdelujete končne filtrske vreče ali samo medije?", sr: "Da li pravite gotove filter vreće ili samo medije?" },
    "Both. We supply the needle-felt media by the roll and confection finished KOFIL filter bags, cages and cassettes to your baghouse dimensions and closure type — vertical integration from fibre to finished element.": { sl: "Oboje. Iglane medije dobavljamo v rolah ter izdelamo končne filtrske vreče, koše in kasete KOFIL po dimenzijah vašega filtra in vrsti zapiranja — vertikalna integracija od vlakna do končnega elementa.", sr: "Oboje. Iglane medije isporučujemo u rolnama i izrađujemo gotove KOFIL filter vreće, korpe i kasete prema dimenzijama vašeg filtera i tipu zatvaranja — vertikalna integracija od vlakna do gotovog elementa." },
    "Is there a minimum order quantity?": { sl: "Ali obstaja minimalna količina naročila?", sr: "Da li postoji minimalna količina porudžbine?" },
    "No. We produce small and custom series with no minimum order quantity, which is why OEM and small-to-mid buyers work with us where full-roll producers cannot help.": { sl: "Ne. Izdelujemo majhne serije in serije po meri brez minimalne količine naročila, zato z nami sodelujejo OEM ter mali in srednji kupci, kjer proizvajalci celih rol ne morejo pomagati.", sr: "Ne. Proizvodimo male i serije po meri bez minimalne količine porudžbine, zbog čega sa nama sarađuju OEM i mali do srednji kupci gde proizvođači celih rolni ne mogu pomoći." },
    "Do you classify to ISO 16890 or EN 779?": { sl: "Klasificirate po ISO 16890 ali EN 779?", sr: "Klasifikujete po ISO 16890 ili EN 779?" },
    "ISO 16890 (ePM1 / ePM2.5 / ePM10 / Coarse). EN 779 was withdrawn in 2018; we provide a conversion reference on request.": { sl: "ISO 16890 (ePM1 / ePM2.5 / ePM10 / Grobo). EN 779 je bil umaknjen leta 2018; referenco za pretvorbo posredujemo na zahtevo.", sr: "ISO 16890 (ePM1 / ePM2.5 / ePM10 / Grubo). EN 779 je povučen 2018; referencu za konverziju dostavljamo na zahtev." },
    "Can you supply antistatic / ATEX-suitable media?": { sl: "Lahko dobavite antistatične medije, primerne za ATEX?", sr: "Možete li isporučiti antistatičke medije pogodne za ATEX?" },
    "Yes. Our antistatic AGT-BT media incorporate a conductive grid and carry a DEKRA EXAM certificate for use in ATEX-classified zones.": { sl: "Da. Naši antistatični mediji AGT-BT vsebujejo prevodno mrežo in imajo certifikat DEKRA EXAM za uporabo v conah, klasificiranih kot ATEX.", sr: "Da. Naši antistatički mediji AGT-BT sadrže provodnu mrežu i poseduju DEKRA EXAM sertifikat za upotrebu u zonama klasifikovanim kao ATEX." },
    "What documentation do you provide?": { sl: "Kakšno dokumentacijo zagotavljate?", sr: "Kakvu dokumentaciju obezbeđujete?" },
    "Technical datasheets, chemical-resistance tables, ISO 16890 classification, and declarations of conformity (EU 1935/2004, 10/2011, REACH) — sent to your business e-mail on request, without a password wall.": { sl: "Tehnične podatkovne liste, tabele kemične odpornosti, klasifikacijo ISO 16890 in izjave o skladnosti (EU 1935/2004, 10/2011, REACH) — poslano na vaš poslovni e-naslov na zahtevo, brez gesla.", sr: "Tehničke listove, tabele hemijske otpornosti, ISO 16890 klasifikaciju i izjave o usaglašenosti (EU 1935/2004, 10/2011, REACH) — poslato na vaš poslovni e-mail na zahtev, bez lozinke." },
    "Filtration quote & datasheets.": { sl: "Ponudba za filtracijo in podatkovni listi.", sr: "Ponuda za filtraciju i tehnički listovi." },
    "Describe the application, working conditions and quantities — we propose the media and finished element, and attach the datasheets. Program is preselected.": { sl: "Opišite aplikacijo, obratovalne pogoje in količine — predlagamo medij in končni element ter priložimo podatkovne liste. Program je predizbran.", sr: "Opišite primenu, radne uslove i količine — predlažemo medij i gotov element i prilažemo tehničke listove. Program je unapred izabran." },
    "PROGRAM: INDUSTRIAL FILTRATION · FILTECH": { sl: "PROGRAM: INDUSTRIJSKA FILTRACIJA · FILTECH", sr: "PROGRAM: INDUSTRIJSKA FILTRACIJA · FILTECH" },
    "Talk to filtration engineering": { sl: "Pogovorite se z inženiringom filtracije", sr: "Razgovarajte sa inženjeringom filtracije" },
    "Working conditions & quantity": { sl: "Obratovalni pogoji in količina", sr: "Radni uslovi i količina" },

    // ============ product · conveyor & power belts ============
    "Engineered conveyor, processing and power-transmission belts — fabric-ply, food-grade PU/PVC, cleated and profiled — confectioned, spliced and finished to your line. A leading producer of special engineered belts, and regional distributor of CHIORINO.": { sl: "Inženirski transportni, procesni in pogonski trakovi — tkani večslojni, PU/PVC za stik z živili, z rebri in profilirani — konfekcionirani, spojeni in dodelani za vašo linijo. Vodilni proizvajalec posebnih inženirskih trakov in regionalni distributer CHIORINO.", sr: "Inženjerske transportne, procesne i pogonske trake — tkane višeslojne, PU/PVC za kontakt s hranom, sa rebrima i profilisane — konfekcionisane, spojene i dorađene za vašu liniju. Vodeći proizvođač posebnih inženjerskih traka i regionalni distributer CHIORINO." },
    "Belts for every line.": { sl: "Trakovi za vsako linijo.", sr: "Trake za svaku liniju." },
    "Food-contact PU/PVC belts for processing and packing lines.": { sl: "PU/PVC trakovi za stik z živili za linije predelave in pakiranja.", sr: "PU/PVC trake za kontakt s hranom za linije prerade i pakovanja." },
    "Packaging & logistics": { sl: "Pakiranje in logistika", sr: "Pakovanje i logistika" },
    "Sorting, accumulation and incline conveying with cleats.": { sl: "Sortiranje, akumulacija in nagibni transport z rebri.", sr: "Sortiranje, akumulacija i kosi transport sa rebrima." },
    "Wood, quarry & minerals": { sl: "Les, kamnolom in minerali", sr: "Drvo, kamenolom i minerali" },
    "Abrasion-resistant fabric-ply belts for bulk handling.": { sl: "Proti obrabi odporni tkani trakovi za sipke materiale.", sr: "Trake otporne na habanje za rasute materijale." },
    "Power transmission": { sl: "Prenos moči", sr: "Prenos snage" },
    "Flat and toothed drive belts for machinery.": { sl: "Ploščati in zobati pogonski jermeni za stroje.", sr: "Pljosnate i nazubljene pogonske trake za mašine." },
    "Belt selection guide.": { sl: "Vodnik za izbiro trakov.", sr: "Vodič za izbor traka." },
    "Indicative ranges for standard constructions. Final specification is confirmed per order.": { sl: "Okvirni razponi za standardne konstrukcije. Končna specifikacija se potrdi za vsako naročilo.", sr: "Okvirni rasponi za standardne konstrukcije. Konačna specifikacija se potvrđuje po porudžbini." },
    "Construction": { sl: "Konstrukcija", sr: "Konstrukcija" },
    "Max width (mm)": { sl: "Najv. širina (mm)", sr: "Maks. širina (mm)" },
    "Strength (N/mm)": { sl: "Trdnost (N/mm)", sr: "Čvrstoća (N/mm)" },
    "Temp. range": { sl: "Temp. razpon", sr: "Temp. opseg" },
    "Surface / cover": { sl: "Površina / obloga", sr: "Površina / obloga" },
    "Fabric-ply conveyor (EP)": { sl: "Tkani večslojni transportni (EP)", sr: "Tkana višeslojna transportna (EP)" },
    "2–4 ply PES/PA": { sl: "2–4 sloji PES/PA", sr: "2–4 sloja PES/PA" },
    "up to 2000": { sl: "do 2000", sr: "do 2000" },
    "Rubber, smooth/rough": { sl: "Guma, gladka/hrapava", sr: "Guma, glatka/hrapava" },
    "Food-grade PU / PVC": { sl: "PU / PVC za stik z živili", sr: "PU / PVC za kontakt s hranom" },
    "Homogeneous / fabric-backed": { sl: "Homogeni / s tkanino", sr: "Homogene / sa tkaninom" },
    "up to 1500": { sl: "do 1500", sr: "do 1500" },
    "FDA / EU food-contact": { sl: "FDA / EU stik z živili", sr: "FDA / EU kontakt s hranom" },
    "Cleated / profiled": { sl: "Z rebri / profilirani", sr: "Sa rebrima / profilisane" },
    "Fabric + welded cleats": { sl: "Tkanina + varjena rebra", sr: "Tkanina + zavarena rebra" },
    "to spec": { sl: "po specifikaciji", sr: "po specifikaciji" },
    "Cleats, sidewalls": { sl: "Rebra, stranice", sr: "Rebra, bočne stranice" },
    "Power-transmission (flat)": { sl: "Pogonski (ploščati)", sr: "Pogonske (pljosnate)" },
    "PA core + friction cover": { sl: "PA jedro + torna obloga", sr: "PA jezgro + frikciona obloga" },
    "high": { sl: "visoka", sr: "visoka" },
    "High-friction / low-noise": { sl: "Visoko trenje / nizek hrup", sr: "Visoko trenje / nizak nivo buke" },
    "Toothed / timing": { sl: "Zobati / časovni", sr: "Nazubljene / tajming" },
    "Reinforced": { sl: "Ojačano", sr: "Ojačano" },
    "Positioning drives": { sl: "Pozicionirni pogoni", sr: "Pozicioni pogoni" },
    "Special / modular": { sl: "Posebni / modularni", sr: "Specijalne / modularne" },
    "Engineered to drawing": { sl: "Izdelano po risbi", sr: "Izrađeno po crtežu" },
    "Custom": { sl: "Po meri", sr: "Po meri" },
    "Send us a drawing or sample": { sl: "Pošljite nam risbo ali vzorec", sr: "Pošaljite nam crtež ili uzorak" },
    "We confection to your pulley diameters, closure type and cleat layout. Send an existing belt sample, drawing or line spec and we reverse-engineer or improve it.": { sl: "Konfekcioniramo po premerih vaših jermenic, vrsti zapiranja in razporeditvi reber. Pošljite obstoječi vzorec traku, risbo ali specifikacijo linije in ga rekonstruiramo ali izboljšamo.", sr: "Konfekcionišemo prema prečnicima vaših koturova, tipu zatvaranja i rasporedu rebara. Pošaljite postojeći uzorak trake, crtež ili specifikaciju linije i mi ćemo je rekonstruisati ili poboljšati." },
    "Start a belt inquiry": { sl: "Začnite povpraševanje za trakove", sr: "Započnite upit za trake" },
    "More than a belt supplier.": { sl: "Več kot dobavitelj trakov.", sr: "Više od dobavljača traka." },
    "We cut, confection, splice (endless), and finish belts with cleats, sidewalls and V-guides. As regional distributor of CHIORINO for Croatia, Bosnia, Serbia, North Macedonia, Albania and Kosovo, we combine our own production with a premium international range.": { sl: "Trakove režemo, konfekcioniramo, spajamo (brezkončno) in dodelamo z rebri, stranicami in V-vodili. Kot regionalni distributer CHIORINO za Hrvaško, Bosno, Srbijo, Severno Makedonijo, Albanijo in Kosovo združujemo lastno proizvodnjo s premijsko mednarodno ponudbo.", sr: "Trake sečemo, konfekcionišemo, spajamo (beskonačno) i doradjujemo sa rebrima, bočnim stranicama i V-vođicama. Kao regionalni distributer CHIORINO za Hrvatsku, Bosnu, Srbiju, Severnu Makedoniju, Albaniju i Kosovo, kombinujemo sopstvenu proizvodnju sa premijum međunarodnom ponudom." },
    "Endless splicing": { sl: "Brezkončno spajanje", sr: "Beskonačno spajanje" },
    "Hot / finger splice": { sl: "Vroči / prstni spoj", sr: "Topli / prstasti spoj" },
    "Cleats & sidewalls": { sl: "Rebra in stranice", sr: "Rebra i bočne stranice" },
    "Incline conveying": { sl: "Nagibni transport", sr: "Kosi transport" },
    "FDA / EU compliant": { sl: "Skladno s FDA / EU", sr: "Usklađeno sa FDA / EU" },
    "Regional distributor": { sl: "Regionalni distributer", sr: "Regionalni distributer" },
    "Conveyor belt range overview": { sl: "Pregled ponudbe transportnih trakov", sr: "Pregled ponude transportnih traka" },
    "Constructions & covers · request": { sl: "Konstrukcije in obloge · zahteva", sr: "Konstrukcije i obloge · zahtev" },
    "Food-grade PU/PVC belt datasheet": { sl: "Podatkovni list PU/PVC traku za stik z živili", sr: "Tehnički list PU/PVC trake za kontakt s hranom" },
    "FDA / EU compliant · request": { sl: "Skladno s FDA / EU · zahteva", sr: "Usklađeno sa FDA / EU · zahtev" },
    "Cleat & sidewall configuration guide": { sl: "Vodnik za konfiguracijo reber in stranic", sr: "Vodič za konfiguraciju rebara i bočnih stranica" },
    "Incline conveying · request": { sl: "Nagibni transport · zahteva", sr: "Kosi transport · zahtev" },
    "Belt measuring & ordering sheet": { sl: "List za merjenje in naročanje trakov", sr: "List za merenje i poručivanje traka" },
    "Get it right first time · request": { sl: "Pravilno že prvič · zahteva", sr: "Tačno iz prve · zahtev" },
    "Our belt engineers reply within one business day.": { sl: "Naši inženirji za trakove odgovorijo v enem delovnem dnevu.", sr: "Naši inženjeri za trake odgovaraju u roku od jednog radnog dana." },
    "Can you make endless (spliced) belts?": { sl: "Lahko izdelate brezkončne (spojene) trakove?", sr: "Možete li napraviti beskonačne (spojene) trake?" },
    "Yes. We cut, confection and splice belts endless (hot and finger splices) to your exact centre distance, and finish them with cleats, sidewalls or V-guides.": { sl: "Da. Trakove režemo, konfekcioniramo in spajamo brezkončno (vroči in prstni spoji) na točno medosno razdaljo ter jih dodelamo z rebri, stranicami ali V-vodili.", sr: "Da. Trake sečemo, konfekcionišemo i spajamo beskonačno (topli i prstasti spojevi) na tačan međuosni razmak i doradjujemo ih rebrima, bočnim stranicama ili V-vođicama." },
    "Do you supply food-contact belts?": { sl: "Dobavljate trakove za stik z živili?", sr: "Isporučujete li trake za kontakt s hranom?" },
    "Yes — homogeneous and fabric-backed PU/PVC belts compliant with FDA and EU food-contact requirements for processing and packaging lines.": { sl: "Da — homogeni in s tkanino podloženi PU/PVC trakovi, skladni z zahtevami FDA in EU za stik z živili, za linije predelave in pakiranja.", sr: "Da — homogene i tkaninom podložene PU/PVC trake, usklađene sa FDA i EU zahtevima za kontakt s hranom, za linije prerade i pakovanja." },
    "No. We produce single belts and small custom series with no minimum order quantity — ideal for maintenance replacements and specials.": { sl: "Ne. Izdelujemo posamezne trakove in majhne serije po meri brez minimalne količine naročila — idealno za vzdrževalne zamenjave in posebne izdelke.", sr: "Ne. Proizvodimo pojedinačne trake i male serije po meri bez minimalne količine porudžbine — idealno za zamene pri održavanju i specijale." },
    "Can you copy an existing belt we already run?": { sl: "Lahko kopirate obstoječi trak, ki ga že uporabljamo?", sr: "Možete li kopirati postojeću traku koju već koristimo?" },
    "Yes. Send an existing sample, a drawing or the line specification and we reverse-engineer or improve the construction.": { sl: "Da. Pošljite obstoječi vzorec, risbo ali specifikacijo linije in konstrukcijo rekonstruiramo ali izboljšamo.", sr: "Da. Pošaljite postojeći uzorak, crtež ili specifikaciju linije i mi ćemo konstrukciju rekonstruisati ili poboljšati." },
    "What is your relationship with CHIORINO?": { sl: "Kakšen je vaš odnos s CHIORINO?", sr: "Kakav je vaš odnos sa CHIORINO?" },
    "We are the regional distributor of CHIORINO for Croatia, Bosnia & Herzegovina, Serbia, North Macedonia, Albania and Kosovo — combining our own production with a premium international range.": { sl: "Smo regionalni distributer CHIORINO za Hrvaško, Bosno in Hercegovino, Srbijo, Severno Makedonijo, Albanijo in Kosovo — lastno proizvodnjo združujemo s premijsko mednarodno ponudbo.", sr: "Mi smo regionalni distributer CHIORINO za Hrvatsku, Bosnu i Hercegovinu, Srbiju, Severnu Makedoniju, Albaniju i Kosovo — sopstvenu proizvodnju kombinujemo sa premijum međunarodnom ponudom." },
    "What temperatures can the belts handle?": { sl: "Katere temperature prenesejo trakovi?", sr: "Koje temperature podnose trake?" },
    "Standard fabric-ply belts run −30 to +120 °C and food-grade PU/PVC −10 to +80 °C; special constructions extend the range. We match the cover and carcass to your process.": { sl: "Standardni tkani trakovi delujejo od −30 do +120 °C, PU/PVC za stik z živili od −10 do +80 °C; posebne konstrukcije razširijo razpon. Oblogo in ogrodje prilagodimo vašemu procesu.", sr: "Standardne tkane trake rade od −30 do +120 °C, a PU/PVC za kontakt s hranom od −10 do +80 °C; specijalne konstrukcije proširuju opseg. Oblogu i karkasu prilagođavamo vašem procesu." },
    "Belt quote & fabrication.": { sl: "Ponudba in izdelava trakov.", sr: "Ponuda i izrada traka." },
    "Send belt dimensions, pulley diameters and line conditions — or an existing sample — and we propose the construction and finishing. Program is preselected.": { sl: "Pošljite dimenzije traku, premere jermenic in pogoje linije — ali obstoječi vzorec — in predlagamo konstrukcijo ter dodelavo. Program je predizbran.", sr: "Pošaljite dimenzije trake, prečnike koturova i uslove linije — ili postojeći uzorak — i predlažemo konstrukciju i doradu. Program je unapred izabran." },
    "PROGRAM: CONVEYOR & POWER BELTS · VULKAN PROTEKTOR": { sl: "PROGRAM: TRANSPORTNI IN POGONSKI TRAKOVI · VULKAN PROTEKTOR", sr: "PROGRAM: TRANSPORTNE I POGONSKE TRAKE · VULKAN PROTEKTOR" },
    "Talk to belt engineering": { sl: "Pogovorite se z inženiringom trakov", sr: "Razgovarajte sa inženjeringom traka" },
    "Dimensions & line conditions": { sl: "Dimenzije in pogoji linije", sr: "Dimenzije i uslovi linije" },

    // ============ product · synthetic leather ============
    "Synthetic leather substrates": { sl: "Nosilci za sintetično usnje", sr: "Nosači za sintetičku kožu" },
    "High-quality needle-punched nonwoven base materials for synthetic leather and PU-coated products — engineered for the coating process, hand and durability your application demands. Produced by our Serbian company, Konus S.": { sl: "Visokokakovostni iglani netkani osnovni materiali za sintetično usnje in izdelke z nanosom PU — zasnovani za postopek nanašanja, otip in trajnost, ki jih zahteva vaša aplikacija. Izdeluje jih naše srbsko podjetje Konus S.", sr: "Visokokvalitetni iglani netkani osnovni materijali za sintetičku kožu i proizvode sa PU premazom — projektovani za proces nanošenja, opip i trajnost koje vaša primena zahteva. Proizvodi ih naša srpska kompanija Konus S." },
    "The base beneath the finish.": { sl: "Osnova pod površino.", sr: "Osnova ispod završnog sloja." },
    "Footwear": { sl: "Obutev", sr: "Obuća" },
    "Uppers, linings and reinforcement substrates for coating.": { sl: "Zgornji deli, podloge in ojačitveni nosilci za nanašanje.", sr: "Gornjišta, postave i ojačavajući nosači za nanošenje." },
    "Leather goods": { sl: "Usnjena galanterija", sr: "Kožna galanterija" },
    "Bags, accessories and small goods requiring a consistent base.": { sl: "Torbe, dodatki in drobno blago, ki potrebujejo enakomerno osnovo.", sr: "Torbe, dodaci i sitna roba kojima je potrebna ujednačena osnova." },
    "Automotive interior": { sl: "Notranjost vozil", sr: "Enterijer vozila" },
    "Substrates for seat, trim and surface materials.": { sl: "Nosilci za sedeže, obloge in površinske materiale.", sr: "Nosači za sedišta, obloge i površinske materijale." },
    "Furniture & upholstery": { sl: "Pohištvo in oblazinjenje", sr: "Nameštaj i tapaciranje" },
    "Backing and base layers for upholstery materials.": { sl: "Podloge in osnovni sloji za materiale za oblazinjenje.", sr: "Podloge i osnovni slojevi za materijale za tapaciranje." },
    "Substrate selection guide.": { sl: "Vodnik za izbiro nosilcev.", sr: "Vodič za izbor nosača." },
    "Indicative ranges. Final specification confirmed per order.": { sl: "Okvirni razponi. Končna specifikacija se potrdi za vsako naročilo.", sr: "Okvirni rasponi. Konačna specifikacija se potvrđuje po porudžbini." },
    "Substrate": { sl: "Nosilec", sr: "Nosač" },
    "Thickness (mm)": { sl: "Debelina (mm)", sr: "Debljina (mm)" },
    "Finish": { sl: "Površina", sr: "Završna obrada" },
    "Typical use": { sl: "Tipična uporaba", sr: "Tipična upotreba" },
    "Needle-punched PES": { sl: "Iglani PES", sr: "Iglani PES" },
    "For PU coating": { sl: "Za nanos PU", sr: "Za PU premaz" },
    "Blended PES/PA": { sl: "Mešanica PES/PA", sr: "Mešavina PES/PA" },
    "Impregnation": { sl: "Impregnacija", sr: "Impregnacija" },
    "Microfibre-type": { sl: "Mikrovlaknasti", sr: "Mikrovlaknasti" },
    "PES microfibre": { sl: "PES mikrovlakno", sr: "PES mikrovlakno" },
    "Suede / nubuck": { sl: "Semiš / nubuk", sr: "Antilop / nubuk" },
    "Automotive": { sl: "Avtomobilska industrija", sr: "Automobilska industrija" },
    "Bonded fleece backing": { sl: "Lepljena podloga iz flisa", sr: "Lepljena flis podloga" },
    "Lamination base": { sl: "Osnova za laminacijo", sr: "Osnova za laminaciju" },
    "Upholstery": { sl: "Oblazinjenje", sr: "Tapaciranje" },
    "Engineered for your coating line": { sl: "Zasnovano za vašo linijo nanašanja", sr: "Projektovano za vašu liniju nanošenja" },
    "Weight, thickness, density and surface are tuned to your PU/PVC coating process, embossing and final hand. Tell us the target article and we develop the base.": { sl: "Teža, debelina, gostota in površina so prilagojene vašemu postopku nanosa PU/PVC, žigosanju in končnemu otipu. Povejte nam ciljni izdelek in razvijemo osnovo.", sr: "Težina, debljina, gustina i površina prilagođeni su vašem procesu nanošenja PU/PVC, utiskivanju i konačnom opipu. Recite nam ciljni artikal i razvićemo osnovu." },
    "Start a substrate inquiry": { sl: "Začnite povpraševanje za nosilce", sr: "Započnite upit za nosače" },
    "Tested for real use.": { sl: "Preizkušeno za resnično uporabo.", sr: "Testirano za stvarnu upotrebu." },
    "Materials for footwear and leather goods are supported by SATRA material testing. Processes follow ISO 9001 and ISO 14001, and REACH declarations of conformity are provided on request.": { sl: "Materiali za obutev in usnjeno galanterijo so podprti s preizkušanjem materialov SATRA. Procesi sledijo ISO 9001 in ISO 14001, izjave o skladnosti REACH pa posredujemo na zahtevo.", sr: "Materijali za obuću i kožnu galanteriju podržani su SATRA ispitivanjem materijala. Procesi prate ISO 9001 i ISO 14001, a REACH izjave o usaglašenosti dostavljamo na zahtev." },
    "Substrate range overview": { sl: "Pregled ponudbe nosilcev", sr: "Pregled ponude nosača" },
    "Types & weights · request": { sl: "Vrste in teže · zahteva", sr: "Tipovi i težine · zahtev" },
    "SATRA test summary": { sl: "Povzetek preizkusov SATRA", sr: "Rezime SATRA testova" },
    "Footwear materials · request": { sl: "Materiali za obutev · zahteva", sr: "Materijali za obuću · zahtev" },
    "REACH declaration of conformity": { sl: "Izjava o skladnosti REACH", sr: "REACH izjava o usaglašenosti" },
    "Compliance · request": { sl: "Skladnost · zahteva", sr: "Usaglašenost · zahtev" },
    "Which coating processes are your substrates suited to?": { sl: "Za katere postopke nanašanja so primerni vaši nosilci?", sr: "Za koje procese nanošenja su pogodni vaši nosači?" },
    "Our needle-punched bases are engineered for PU and PVC coating, impregnation and finishing. Weight, density and surface are tuned to your process and target hand.": { sl: "Naše iglane osnove so zasnovane za nanos PU in PVC, impregnacijo in dodelavo. Teža, gostota in površina so prilagojene vašemu procesu in ciljnemu otipu.", sr: "Naše iglane osnove su projektovane za PU i PVC premaz, impregnaciju i doradu. Težina, gustina i površina prilagođeni su vašem procesu i ciljnom opipu." },
    "What thickness and weight ranges are available?": { sl: "Kateri razponi debeline in teže so na voljo?", sr: "Koji rasponi debljine i težine su dostupni?" },
    "Standard substrates run roughly 120–450 g/m² and 0.5–2.2 mm thick; other constructions are developed to order.": { sl: "Standardni nosilci so približno 120–450 g/m² in debeline 0,5–2,2 mm; druge konstrukcije razvijemo po naročilu.", sr: "Standardni nosači su otprilike 120–450 g/m² i debljine 0,5–2,2 mm; druge konstrukcije razvijamo po porudžbini." },
    "Are the materials tested for footwear?": { sl: "Ali so materiali preizkušeni za obutev?", sr: "Da li su materijali testirani za obuću?" },
    "Yes — footwear and leather-goods materials are supported by SATRA material testing, and REACH declarations of conformity are provided on request.": { sl: "Da — materiali za obutev in usnjeno galanterijo so podprti s preizkušanjem SATRA, izjave o skladnosti REACH pa posredujemo na zahtevo.", sr: "Da — materijali za obuću i kožnu galanteriju podržani su SATRA ispitivanjem, a REACH izjave o usaglašenosti dostavljamo na zahtev." },
    "No. We develop and produce small and custom series with no minimum order quantity, which suits development runs and specialised articles.": { sl: "Ne. Razvijamo in izdelujemo majhne serije in serije po meri brez minimalne količine naročila, kar ustreza razvojnim serijam in specializiranim izdelkom.", sr: "Ne. Razvijamo i proizvodimo male i serije po meri bez minimalne količine porudžbine, što odgovara razvojnim serijama i specijalizovanim artiklima." },
    "Can you match a specific finish or colour?": { sl: "Lahko dosežete določeno površino ali barvo?", sr: "Možete li postići određenu površinu ili boju?" },
    "We develop the base to your target article; surface (suede/nubuck), density and finish are tuned during development, and we send samples for approval.": { sl: "Osnovo razvijemo za vaš ciljni izdelek; površina (semiš/nubuk), gostota in dodelava se prilagodijo med razvojem, vzorce pa pošljemo v potrditev.", sr: "Osnovu razvijamo za vaš ciljni artikal; površina (antilop/nubuk), gustina i obrada se prilagođavaju tokom razvoja, a uzorke šaljemo na odobrenje." },
    "Substrate quote & samples.": { sl: "Ponudba za nosilce in vzorci.", sr: "Ponuda za nosače i uzorci." },
    "Describe the finished article, coating process and target properties — we develop the base and send samples. Program is preselected.": { sl: "Opišite končni izdelek, postopek nanašanja in ciljne lastnosti — razvijemo osnovo in pošljemo vzorce. Program je predizbran.", sr: "Opišite gotov artikal, proces nanošenja i ciljna svojstva — razvijamo osnovu i šaljemo uzorke. Program je unapred izabran." },
    "PROGRAM: SYNTHETIC LEATHER · KONUS S": { sl: "PROGRAM: SINTETIČNO USNJE · KONUS S", sr: "PROGRAM: SINTETIČKA KOŽA · KONUS S" },
    "Talk to Konus S": { sl: "Pogovorite se s Konus S", sr: "Razgovarajte sa Konus S" },
    "Target article & requirements": { sl: "Ciljni izdelek in zahteve", sr: "Ciljni artikal i zahtevi" },

    // ============ product · cleaning materials ============
    "Technical nonwovens for professional and industrial cleaning — wiping rolls, heavy-duty cloths, polishing cloths and absorbent pads. Low-lint, absorbent and solvent-compatible, converted to your format and available under private label.": { sl: "Tehnični netkani materiali za profesionalno in industrijsko čiščenje — role za brisanje, robustne krpe, polirne krpe in vpojne blazinice. Nizko puščajoči vlakna, vpojni in združljivi s topili, predelani v vaš format ter na voljo pod lastno blagovno znamko.", sr: "Tehnički netkani materijali za profesionalno i industrijsko čišćenje — rolne za brisanje, jake krpe, krpe za poliranje i upijajući jastučići. Niska emisija vlakana, upijajući i kompatibilni sa rastvaračima, prerađeni u vaš format i dostupni pod privatnom robnom markom." },
    "Where they wipe, absorb and polish.": { sl: "Kjer brišejo, vpijajo in polirajo.", sr: "Gde brišu, upijaju i poliraju." },
    "Industrial maintenance": { sl: "Industrijsko vzdrževanje", sr: "Industrijsko održavanje" },
    "General wiping of tools, machines and surfaces.": { sl: "Splošno brisanje orodij, strojev in površin.", sr: "Opšte brisanje alata, mašina i površina." },
    "Automotive & workshops": { sl: "Avtomobilske delavnice", sr: "Automobilske radionice" },
    "Solvent-resistant cloths for oils, grease and paint.": { sl: "Krpe, odporne na topila, za olja, masti in barve.", sr: "Krpe otporne na rastvarače za ulja, masti i boje." },
    "Print & precision": { sl: "Tisk in precizno delo", sr: "Štampa i preciznost" },
    "Low-lint and microfibre cloths for streak-free work.": { sl: "Nizko puščajoče in mikrovlaknaste krpe za delo brez sledi.", sr: "Krpe niske emisije vlakana i mikrovlaknaste krpe za rad bez tragova." },
    "Spill & liquid control": { sl: "Nadzor razlitij in tekočin", sr: "Kontrola prosipanja i tečnosti" },
    "Absorbent pads and mats for oil and liquids.": { sl: "Vpojne blazinice in podloge za olje in tekočine.", sr: "Upijajući jastučići i podloške za ulje i tečnosti." },
    "Cleaning range guide.": { sl: "Vodnik po ponudbi za čiščenje.", sr: "Vodič kroz ponudu za čišćenje." },
    "Product": { sl: "Izdelek", sr: "Proizvod" },
    "Format": { sl: "Format", sr: "Format" },
    "Key feature": { sl: "Ključna lastnost", sr: "Ključna karakteristika" },
    "Use": { sl: "Uporaba", sr: "Upotreba" },
    "Industrial wipe roll": { sl: "Industrijska rola za brisanje", sr: "Industrijska rolna za brisanje" },
    "PP / viscose": { sl: "PP / viskoza", sr: "PP / viskoza" },
    "Roll / precut": { sl: "Rola / narezano", sr: "Rolna / isečeno" },
    "Low-lint": { sl: "Nizko puščanje vlaken", sr: "Niska emisija vlakana" },
    "Maintenance": { sl: "Vzdrževanje", sr: "Održavanje" },
    "Heavy-duty cloth": { sl: "Robustna krpa", sr: "Jaka krpa" },
    "PES / viscose": { sl: "PES / viskoza", sr: "PES / viskoza" },
    "Sheets": { sl: "Listi", sr: "Listovi" },
    "Solvent-resistant": { sl: "Odporno na topila", sr: "Otporno na rastvarače" },
    "Workshops": { sl: "Delavnice", sr: "Radionice" },
    "Polishing / lens cloth": { sl: "Polirna krpa / krpa za leče", sr: "Krpa za poliranje / za sočiva" },
    "Microfibre": { sl: "Mikrovlakno", sr: "Mikrovlakno" },
    "Precut": { sl: "Narezano", sr: "Isečeno" },
    "Streak-free": { sl: "Brez sledi", sr: "Bez tragova" },
    "Precision": { sl: "Precizno delo", sr: "Preciznost" },
    "Absorbent pad / mat": { sl: "Vpojna blazinica / podloga", sr: "Upijajući jastučić / podloška" },
    "High absorbency": { sl: "Visoka vpojnost", sr: "Visoka upojnost" },
    "Spill control": { sl: "Nadzor razlitij", sr: "Kontrola prosipanja" },
    "Converted to your format — and your brand": { sl: "Predelano v vaš format — in vašo blagovno znamko", sr: "Prerađeno u vaš format — i vašu robnu marku" },
    "Rolls, folded sheets, precut wipes and dispenser packs, in your sizes and packaging. Private-label supply with no minimum order quantity.": { sl: "Role, zloženi listi, narezane krpe in paketi za dozirnike, v vaših velikostih in embalaži. Dobava pod lastno blagovno znamko brez minimalne količine naročila.", sr: "Rolne, presavijeni listovi, isečene krpe i paketi za dozatore, u vašim veličinama i pakovanju. Isporuka pod privatnom robnom markom bez minimalne količine porudžbine." },
    "Start a cleaning inquiry": { sl: "Začnite povpraševanje za čiščenje", sr: "Započnite upit za čišćenje" },
    "Consistent, batch after batch.": { sl: "Dosledno, serija za serijo.", sr: "Dosledno, serija za serijom." },
    "Cleaning nonwovens are produced under ISO 9001 and ISO 14001 with consistent absorbency and lint behaviour. Food-area suitability and REACH declarations are provided on request.": { sl: "Netkani materiali za čiščenje so izdelani po ISO 9001 in ISO 14001 z dosledno vpojnostjo in obnašanjem vlaken. Primernost za živilska območja in izjave REACH posredujemo na zahtevo.", sr: "Netkani materijali za čišćenje proizvode se po ISO 9001 i ISO 14001 sa doslednom upojnošću i ponašanjem vlakana. Pogodnost za zone s hranom i REACH izjave dostavljamo na zahtev." },
    "Datasheets & formats.": { sl: "Podatkovni listi in formati.", sr: "Tehnički listovi i formati." },
    "Cleaning range overview": { sl: "Pregled ponudbe za čiščenje", sr: "Pregled ponude za čišćenje" },
    "Products & weights · request": { sl: "Izdelki in teže · zahteva", sr: "Proizvodi i težine · zahtev" },
    "Format & packaging options": { sl: "Možnosti formata in embalaže", sr: "Opcije formata i pakovanja" },
    "Private label · request": { sl: "Lastna blagovna znamka · zahteva", sr: "Privatna robna marka · zahtev" },
    "Are your cleaning nonwovens low-lint?": { sl: "Ali vaši netkani materiali za čiščenje malo puščajo vlakna?", sr: "Da li vaši netkani materijali za čišćenje imaju nisku emisiju vlakana?" },
    "Yes — we offer controlled low-lint materials for precision and finishing work, as well as heavy-duty grades for general wiping.": { sl: "Da — ponujamo materiale z nadzorovanim nizkim puščanjem vlaken za precizno in zaključno delo ter robustne kakovosti za splošno brisanje.", sr: "Da — nudimo materijale sa kontrolisanom niskom emisijom vlakana za precizan i završni rad, kao i jake klase za opšte brisanje." },
    "Are they compatible with solvents?": { sl: "So združljivi s topili?", sr: "Da li su kompatibilni sa rastvaračima?" },
    "Our PES/viscose heavy-duty grades resist common workshop solvents, oils and greases. Tell us the chemicals in use and we recommend the right grade.": { sl: "Naše robustne kakovosti PES/viskoza so odporne na običajna delavniška topila, olja in masti. Povejte nam, katere kemikalije uporabljate, in priporočimo pravo kakovost.", sr: "Naše jake klase PES/viskoza otporne su na uobičajene radioničke rastvarače, ulja i masti. Recite nam koje hemikalije koristite i preporučićemo pravu klasu." },
    "Can you supply for food areas?": { sl: "Lahko dobavljate za živilska območja?", sr: "Možete li isporučiti za zone s hranom?" },
    "Suitable grades and REACH declarations of conformity are provided on request for use in food-handling environments.": { sl: "Ustrezne kakovosti in izjave o skladnosti REACH posredujemo na zahtevo za uporabo v okoljih z ravnanjem z živili.", sr: "Odgovarajuće klase i REACH izjave o usaglašenosti dostavljamo na zahtev za upotrebu u okruženjima s hranom." },
    "Which formats and packaging can you provide?": { sl: "Katere formate in embalažo lahko zagotovite?", sr: "Koje formate i pakovanja možete obezbediti?" },
    "Rolls, folded sheets, precut wipes and dispenser packs, in your sizes and packaging — including private label.": { sl: "Role, zloženi listi, narezane krpe in paketi za dozirnike, v vaših velikostih in embalaži — vključno z lastno blagovno znamko.", sr: "Rolne, presavijeni listovi, isečene krpe i paketi za dozatore, u vašim veličinama i pakovanju — uključujući privatnu robnu marku." },
    "No. We convert and pack small and custom series with no minimum order quantity.": { sl: "Ne. Predelujemo in pakiramo majhne serije in serije po meri brez minimalne količine naročila.", sr: "Ne. Prerađujemo i pakujemo male i serije po meri bez minimalne količine porudžbine." },
    "Cleaning quote & samples.": { sl: "Ponudba za čiščenje in vzorci.", sr: "Ponuda za čišćenje i uzorci." },
    "Describe the task, format and volumes — we propose the material, format and packaging, private label if needed. Program is preselected.": { sl: "Opišite nalogo, format in količine — predlagamo material, format in embalažo, po potrebi z lastno blagovno znamko. Program je predizbran.", sr: "Opišite zadatak, format i količine — predlažemo materijal, format i pakovanje, po potrebi sa privatnom robnom markom. Program je unapred izabran." },
    "PROGRAM: CLEANING MATERIALS": { sl: "PROGRAM: MATERIALI ZA ČIŠČENJE", sr: "PROGRAM: MATERIJALI ZA ČIŠĆENJE" },
    "Talk to our team": { sl: "Pogovorite se z našo ekipo", sr: "Razgovarajte sa našim timom" },
    "Product type": { sl: "Vrsta izdelka", sr: "Tip proizvoda" },
    "Task, format & volume": { sl: "Naloga, format in količina", sr: "Zadatak, format i količina" },

    // ============ product · linings & laminates ============
    "Linings & technical laminates": { sl: "Podloge in tehnični laminati", sr: "Postave i tehnički laminati" },
    "Technical textile laminates and linings — flame and adhesive lamination, foam-backed and multi-layer constructions — engineered for automotive interiors, footwear, apparel and technical uses. We combine your face materials with the backing and bond your process needs.": { sl: "Tehnični tekstilni laminati in podloge — plamenska in lepilna laminacija, s peno in večslojne konstrukcije — zasnovani za notranjost vozil, obutev, oblačila in tehnične namene. Vaše zunanje materiale združimo s podlogo in vezjo, kot ju zahteva vaš proces.", sr: "Tehnički tekstilni laminati i postave — plamena i lepljiva laminacija, sa penom i višeslojne konstrukcije — projektovani za enterijere vozila, obuću, odeću i tehničke namene. Vaše lice materijala kombinujemo sa podlogom i vezom koje vaš proces zahteva." },
    "Layered for performance.": { sl: "Slojevito za zmogljivost.", sr: "Slojevito za performanse." },
    "Foam-laminated headliners, trim and seat materials.": { sl: "S peno laminirani stropi, obloge in materiali za sedeže.", sr: "Penom laminirane tapacirunge, obloge i materijali za sedišta." },
    "Footwear linings": { sl: "Podloge za obutev", sr: "Postave za obuću" },
    "Reinforced, nonwoven-backed linings for uppers.": { sl: "Ojačane podloge z netkano hrbtno stranjo za zgornje dele.", sr: "Ojačane postave sa netkanom podlogom za gornjišta." },
    "Apparel & textile": { sl: "Oblačila in tekstil", sr: "Odeća i tekstil" },
    "Bonded multi-layer textiles with soft touch.": { sl: "Lepljeni večslojni tekstili z mehkim otipom.", sr: "Lepljeni višeslojni tekstili sa mekim opipom." },
    "Technical & upholstery": { sl: "Tehnika in oblazinjenje", sr: "Tehnika i tapaciranje" },
    "Membrane and reinforcement laminates to spec.": { sl: "Membranski in ojačitveni laminati po specifikaciji.", sr: "Membranski i ojačavajući laminati po specifikaciji." },
    "Laminate selection guide.": { sl: "Vodnik za izbiro laminatov.", sr: "Vodič za izbor laminata." },
    "Layers": { sl: "Sloji", sr: "Slojevi" },
    "Backing": { sl: "Podloga", sr: "Podloga" },
    "Bond": { sl: "Vez", sr: "Vez" },
    "Foam-laminated lining": { sl: "S peno laminirana podloga", sr: "Penom laminirana postava" },
    "Textile + PU foam + scrim": { sl: "Tekstil + PU pena + mrežica", sr: "Tekstil + PU pena + mrežica" },
    "Foam 2–8 mm": { sl: "Pena 2–8 mm", sr: "Pena 2–8 mm" },
    "Flame / adhesive": { sl: "Plamen / lepilo", sr: "Plamen / lepak" },
    "Textile-to-textile": { sl: "Tekstil na tekstil", sr: "Tekstil na tekstil" },
    "2–3 layer": { sl: "2–3 sloji", sr: "2–3 sloja" },
    "Adhesive": { sl: "Lepilo", sr: "Lepak" },
    "Apparel": { sl: "Oblačila", sr: "Odeća" },
    "Nonwoven-backed": { sl: "Z netkano podlogo", sr: "Sa netkanom podlogom" },
    "Face + nonwoven": { sl: "Lice + netkano", sr: "Lice + netkano" },
    "Flame": { sl: "Plamen", sr: "Plamen" },
    "Membrane laminate": { sl: "Membranski laminat", sr: "Membranski laminat" },
    "Textile + membrane": { sl: "Tekstil + membrana", sr: "Tekstil + membrana" },
    "Breathable / technical": { sl: "Dihajoče / tehnično", sr: "Prozračno / tehničko" },
    "Flame & adhesive lamination": { sl: "Plamenska in lepilna laminacija", sr: "Plamena i lepljiva laminacija" },
    "We laminate your face materials to foam, scrim, nonwoven or membrane by flame or adhesive process — tuned for bond strength, hand and, where needed, automotive interior requirements.": { sl: "Vaše zunanje materiale laminiramo na peno, mrežico, netkani material ali membrano s plamenskim ali lepilnim postopkom — prilagojeno za trdnost vezi, otip in po potrebi zahteve notranjosti vozil.", sr: "Vaše lice materijala laminiramo na penu, mrežicu, netkani materijal ili membranu plamenim ili lepljivim postupkom — prilagođeno za čvrstoću veze, opip i, po potrebi, zahteve enterijera vozila." },
    "Start a laminate inquiry": { sl: "Začnite povpraševanje za laminate", sr: "Započnite upit za laminate" },
    "Bonded to hold.": { sl: "Zlepljeno, da drži.", sr: "Slepljeno da drži." },
    "Laminates are produced under ISO 9001 and ISO 14001 with controlled bond strength and dimensional stability. SATRA testing supports footwear laminates, and REACH declarations of conformity are provided on request.": { sl: "Laminati so izdelani po ISO 9001 in ISO 14001 z nadzorovano trdnostjo vezi in dimenzijsko stabilnostjo. Preizkušanje SATRA podpira laminate za obutev, izjave o skladnosti REACH pa posredujemo na zahtevo.", sr: "Laminati se proizvode po ISO 9001 i ISO 14001 sa kontrolisanom čvrstoćom veze i dimenzionalnom stabilnošću. SATRA ispitivanje podržava laminate za obuću, a REACH izjave o usaglašenosti dostavljamo na zahtev." },
    "Footwear testing": { sl: "Preizkušanje obutve", sr: "Ispitivanje obuće" },
    "Laminate range overview": { sl: "Pregled ponudbe laminatov", sr: "Pregled ponude laminata" },
    "Constructions & bonds · request": { sl: "Konstrukcije in vezi · zahteva", sr: "Konstrukcije i vezovi · zahtev" },
    "Automotive interior laminates": { sl: "Laminati za notranjost vozil", sr: "Laminati za enterijer vozila" },
    "Foam-backed · request": { sl: "S peno · zahteva", sr: "Sa penom · zahtev" },
    "Which lamination methods do you offer?": { sl: "Katere metode laminacije ponujate?", sr: "Koje metode laminacije nudite?" },
    "Both flame lamination and adhesive lamination, to foam, scrim, nonwoven or membrane backings — selected for bond strength, hand and end-use requirements.": { sl: "Tako plamensko kot lepilno laminacijo na podloge iz pene, mrežice, netkanega materiala ali membrane — izbrano glede na trdnost vezi, otip in zahteve končne uporabe.", sr: "I plamenu i lepljivu laminaciju, na podloge od pene, mrežice, netkanog materijala ili membrane — izabrano prema čvrstoći veze, opipu i zahtevima krajnje upotrebe." },
    "What foam thicknesses can you laminate?": { sl: "Katere debeline pene lahko laminirate?", sr: "Koje debljine pene možete laminirati?" },
    "Foam-laminated linings are typically produced with 2–8 mm PU foam; other thicknesses are developed to order.": { sl: "S peno laminirane podloge običajno izdelamo z 2–8 mm PU pene; druge debeline razvijemo po naročilu.", sr: "Penom laminirane postave obično se prave sa 2–8 mm PU pene; druge debljine razvijamo po porudžbini." },
    "Can you meet automotive interior requirements?": { sl: "Lahko izpolnite zahteve za notranjost vozil?", sr: "Možete li ispuniti zahteve za enterijer vozila?" },
    "Yes — we develop foam-laminated interior materials to your OEM/Tier specification. Share the target standard and we confirm feasibility.": { sl: "Da — s peno laminirane materiale za notranjost razvijemo po vaši specifikaciji OEM/Tier. Delite ciljni standard in potrdimo izvedljivost.", sr: "Da — penom laminirane materijale za enterijer razvijamo prema vašoj OEM/Tier specifikaciji. Podelite ciljni standard i potvrdićemo izvodljivost." },
    "Do you laminate our own face materials?": { sl: "Ali laminirate naše lastne zunanje materiale?", sr: "Da li laminirate naše sopstveno lice materijala?" },
    "Yes. Send your face material and target construction and we combine it with the backing and bond you need, then send samples for approval.": { sl: "Da. Pošljite svoj zunanji material in ciljno konstrukcijo, mi pa ga združimo s potrebno podlogo in vezjo ter pošljemo vzorce v potrditev.", sr: "Da. Pošaljite svoje lice materijala i ciljnu konstrukciju, a mi ćemo ga kombinovati sa potrebnom podlogom i vezom, pa poslati uzorke na odobrenje." },
    "No. We laminate small and custom series with no minimum order quantity, suited to development and specialised runs.": { sl: "Ne. Laminiramo majhne serije in serije po meri brez minimalne količine naročila, primerne za razvoj in specializirane serije.", sr: "Ne. Laminiramo male i serije po meri bez minimalne količine porudžbine, pogodne za razvoj i specijalizovane serije." },
    "Laminate quote & development.": { sl: "Ponudba in razvoj laminatov.", sr: "Ponuda i razvoj laminata." },
    "Send your face material, target construction and end use — we propose the backing, bond and finishing. Program is preselected.": { sl: "Pošljite svoj zunanji material, ciljno konstrukcijo in končno uporabo — predlagamo podlogo, vez in dodelavo. Program je predizbran.", sr: "Pošaljite svoje lice materijala, ciljnu konstrukciju i krajnju upotrebu — predlažemo podlogu, vez i doradu. Program je unapred izabran." },
    "PROGRAM: LININGS & LAMINATES · FLATEX": { sl: "PROGRAM: PODLOGE IN LAMINATI · FLATEX", sr: "PROGRAM: POSTAVE I LAMINATI · FLATEX" },
    "Our team replies within one business day.": { sl: "Naša ekipa odgovori v enem delovnem dnevu.", sr: "Naš tim odgovara u roku od jednog radnog dana." },
    "Construction & end use": { sl: "Konstrukcija in končna uporaba", sr: "Konstrukcija i krajnja upotreba" }
  };

  // ---- engine ----
  function optKey(t){ return MAP['@opt:'+t] ? '@opt:'+t : (MAP[t] ? t : null); }

  var FWD = { text:{}, ph:{}, opt:{} };   // english -> {sl,sr}
  var REV = { text:{}, ph:{}, opt:{} };   // sl|sr string -> english
  (function build(){
    for (var key in MAP){
      var v = MAP[key], bucket, en;
      if (key.indexOf('@ph:')===0){ bucket='ph'; en=key.slice(4); }
      else if (key.indexOf('@opt:')===0){ bucket='opt'; en=key.slice(5); }
      else { bucket='text'; en=key; }
      FWD[bucket][en] = v;
      if (v.sl && v.sl!==en && !REV[bucket][v.sl]) REV[bucket][v.sl] = en;
      if (v.sr && v.sr!==en && !REV[bucket][v.sr]) REV[bucket][v.sr] = en;
    }
  })();

  var applying = false;
  var baseTitle = (typeof document !== 'undefined') ? document.title : '';

  function inSkip(node){
    var el = node.nodeType === 3 ? node.parentElement : node;
    return !!(el && el.closest && el.closest('#kk-header, footer'));
  }
  function setText(node, raw, val){
    var lead = raw.match(/^\s*/)[0], trail = raw.match(/\s*$/)[0];
    node.nodeValue = lead + val + trail;
  }

  // Revert everything under root back to English using REV maps.
  function toBase(root){
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

  // Translate English -> target lang under root.
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
    toBase(root);                        // reset to English baseline first
    document.title = baseTitle;
    document.documentElement.lang = DOC_LANG[lang] || 'en';
    if (lang !== 'en'){
      var tt = FWD.text[baseTitle]; if (tt && tt[lang]) document.title = tt[lang];
      toLang(root, lang);
    }
    setTimeout(function(){ applying = false; }, 0);
  }

  function currentLang(){
    var l = 'en';
    try { l = localStorage.getItem('kk-lang') || 'en'; } catch(e){}
    return (l==='sl'||l==='en'||l==='sr') ? l : 'en';
  }

  function boot(){
    var l = currentLang();
    if (l !== 'en') apply(l);
    setTimeout(function(){ var c = currentLang(); if (c !== 'en') apply(c); }, 300);
    setTimeout(function(){ var c = currentLang(); if (c !== 'en') apply(c); }, 900);
    var pending = null;
    var root = document.getElementById('dc-root') || document.body;
    var obs = new MutationObserver(function(){
      if (applying) return;
      if (currentLang() === 'en') return;
      clearTimeout(pending);
      pending = setTimeout(function(){ var c = currentLang(); if (c !== 'en') apply(c); }, 120);
    });
    try { obs.observe(root, { childList: true, subtree: true, characterData: true }); } catch(e){}
  }

  window.addEventListener('kk-lang', function(e){ apply((e.detail==='sl'||e.detail==='en'||e.detail==='sr')?e.detail:'en'); });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
