// =========================================================================
// MODULO: COMPOSITORE GIORNALIERO & MAXI LIBRERIA PIATTI (composer.js)
// =========================================================================

let activeComposerSlot = 'colazione';
let activeComposerMode = 'dishes';
let activeDishCategory = 'Tutti';

const composerMealSlots = [
    { id: 'colazione', label: 'Colazione', short: 'Colaz.' },
    { id: 'spuntino', label: 'Spuntino Mattina', short: 'Spunt.' },
    { id: 'pranzo', label: 'Pranzo', short: 'Pranzo' },
    { id: 'merenda', label: 'Merenda Pomeriggio', short: 'Meren.' },
    { id: 'cena', label: 'Cena', short: 'Cena' }
];

// MAXI LIBRERIA DI PIATTI GENERICI (Nomi brevi, chiari e Kcal/Macro precalcolati)
const readyDishesLibrary = [
    // --- COLAZIONI ---
    { id: 'd1', cat: 'Colazione', name: 'Yogurt Greco + Cornflakes e Fondente', sub: '170g greco 0% • 30g cereali • 10g fondente', kcal: 300, c: 38, p: 22, g: 6 },
    { id: 'd2', cat: 'Colazione', name: 'Latte + 4 Fette Biscottate e Marmellata', sub: '200ml latte parz. scremato • 4 fette • marmellata', kcal: 295, c: 42, p: 12, g: 6 },
    { id: 'd3', cat: 'Colazione', name: 'Toast Salato Tacchino e Spalmabile', sub: '2 fette pancarré • 50g tacchino • velo formaggio', kcal: 305, c: 34, p: 23, g: 8 },
    { id: 'd4', cat: 'Colazione', name: 'Pancake Proteici Avena e Arachidi', sub: '50g avena • 120ml albume • 15g burro arachidi', kcal: 380, c: 42, p: 26, g: 11 },
    { id: 'd5', cat: 'Colazione', name: 'Porridge Caldo Avena, Mela e Noci', sub: '50g avena • 150ml latte • 1 mela • 10g noci', kcal: 360, c: 52, p: 14, g: 10 },
    { id: 'd6', cat: 'Colazione', name: 'Uova Strapazzate e Pane Tostato', sub: '2 uova intere • 60g pane tostato', kcal: 310, c: 30, p: 18, g: 12 },
    { id: 'd7', cat: 'Colazione', name: 'Cappuccino e Cornetto Semplice (Bar)', sub: '1 cappuccino • 1 brioche classica da bar', kcal: 390, c: 48, p: 10, g: 17 },
    { id: 'd8', cat: 'Colazione', name: 'Latte e Biscotti Secchi (Classica)', sub: '250ml latte • 40g biscotti secchi', kcal: 290, c: 41, p: 11, g: 8 },
    { id: 'd9', cat: 'Colazione', name: 'French Toast Proteico con Miele', sub: '2 fette pane • 120ml albume • 10g miele', kcal: 270, c: 38, p: 21, g: 3 },
    { id: 'd10', cat: 'Colazione', name: 'Toast Salmone Affumicato e Philadelphia', sub: '60g pane • 60g salmone • 25g spalmabile light', kcal: 315, c: 31, p: 21, g: 11 },

    // --- SPUNTINI & MERENDE ---
    { id: 'd11', cat: 'Spuntini', name: 'Budino o Mousse Proteica', sub: '1 vasetto da 200g (gusto cioccolato/vaniglia)', kcal: 160, c: 12, p: 20, g: 3 },
    { id: 'd12', cat: 'Spuntini', name: 'Crackers + Fesa di Tacchino', sub: '1 pacchetto crackers • 50g tacchino', kcal: 175, c: 20, p: 16, g: 3 },
    { id: 'd13', cat: 'Spuntini', name: 'Gallette di Mais + Bresaola', sub: '3 gallette • 50g bresaola', kcal: 165, c: 18, p: 18, g: 2 },
    { id: 'd14', cat: 'Spuntini', name: 'Frutto + Pezzetto di Parmigiano', sub: '1 mela/pera/banana • 25g Parmigiano', kcal: 180, c: 20, p: 9, g: 7 },
    { id: 'd15', cat: 'Spuntini', name: 'Parmigiano a Cubetti + Taralli', sub: '30g Parmigiano • 25g taralli o grissini', kcal: 230, c: 17, p: 12, g: 13 },
    { id: 'd16', cat: 'Spuntini', name: 'Yogurt Greco 0% + Frutto Fresco', sub: '170g yogurt greco • 1 frutto medio', kcal: 175, c: 24, p: 18, g: 0 },
    { id: 'd17', cat: 'Spuntini', name: 'Barretta Proteica Classica', sub: '1 barretta da 50g (~20g proteine)', kcal: 185, c: 18, p: 20, g: 5 },
    { id: 'd18', cat: 'Spuntini', name: 'Paninetto Piccolo al Prosciutto Crudo', sub: '40g pane • 50g crudo sgrassato', kcal: 195, c: 21, p: 17, g: 4 },
    { id: 'd19', cat: 'Spuntini', name: 'Yogurt Greco + 2 Gallette al Fondente', sub: '150g yogurt greco • 2 gallette ricoperte', kcal: 230, c: 26, p: 17, g: 6 },
    { id: 'd20', cat: 'Spuntini', name: 'Shaker Proteine Whey + Banana', sub: '30g whey in acqua • 1 banana media', kcal: 220, c: 25, p: 25, g: 2 },

    // --- PRIMI PIATTI ---
    { id: 'd21', cat: 'Primi', name: 'Pasta al Pomodoro e Parmigiano', sub: '80g pasta • passata • 10g parmigiano • olio', kcal: 430, c: 64, p: 14, g: 12 },
    { id: 'd22', cat: 'Primi', name: 'Pasta al Ragù Magro di Manzo', sub: '80g pasta • 120g macinato magro • sugo • olio', kcal: 560, c: 64, p: 38, g: 16 },
    { id: 'd23', cat: 'Primi', name: 'Pasta al Ragù Bianco di Pollo/Tacchino', sub: '80g pasta • 130g macinato pollo • olio', kcal: 530, c: 62, p: 42, g: 12 },
    { id: 'd24', cat: 'Primi', name: 'Pasta Tonno e Pomodorini', sub: '80g pasta • 120g tonno naturale • pomodorini • olio', kcal: 510, c: 63, p: 40, g: 11 },
    { id: 'd25', cat: 'Primi', name: 'Pasta Cremosa Tonno e Philadelphia', sub: '80g pasta • 120g tonno • 30g philadelphia light', kcal: 540, c: 65, p: 44, g: 11 },
    { id: 'd26', cat: 'Primi', name: 'Pasta Zucchine, Cotto e Parmigiano', sub: '80g pasta • 80g cotto magro • zucchine • grana', kcal: 550, c: 66, p: 32, g: 16 },
    { id: 'd27', cat: 'Primi', name: 'Pasta alla Carbonara Fit', sub: '80g pasta • 1 uovo+albume • 60g cotto/fesa • pecorino', kcal: 570, c: 64, p: 36, g: 18 },
    { id: 'd28', cat: 'Primi', name: 'Pasta Pesto e Pollo a Cubetti', sub: '80g pasta • 120g pollo • 20g pesto alla genovese', kcal: 565, c: 62, p: 39, g: 17 },
    { id: 'd29', cat: 'Primi', name: 'Pasta e Ceci con Tacchino Rosolato', sub: '80g pasta • 100g ceci • 80g tacchino • olio', kcal: 580, c: 74, p: 38, g: 14 },
    { id: 'd30', cat: 'Primi', name: 'Pasta e Lenticchie Completa', sub: '80g pasta • 150g lenticchie cotte • olio', kcal: 495, c: 82, p: 22, g: 9 },
    { id: 'd31', cat: 'Primi', name: 'Riso Basmati Pollo al Curry e Zucchine', sub: '80g riso • 150g petto di pollo • zucchine • olio', kcal: 540, c: 66, p: 43, g: 11 },
    { id: 'd32', cat: 'Primi', name: 'Riso Basmati Tonno, Uova Sode e Piselli', sub: '80g riso • 80g tonno • 2 uova sode • olio', kcal: 590, c: 65, p: 44, g: 17 },
    { id: 'd33', cat: 'Primi', name: 'Riso Basmati Salmone e Zucchine', sub: '80g riso • 120g salmone • zucchine • olio', kcal: 575, c: 64, p: 33, g: 20 },
    { id: 'd34', cat: 'Primi', name: 'Gnocchi al Ragù Magro', sub: '200g gnocchi di patate • 130g macinato magro • olio', kcal: 550, c: 68, p: 36, g: 14 },
    { id: 'd35', cat: 'Primi', name: 'Gnocchi alla Sorrentina Light', sub: '200g gnocchi • pomodoro • 100g mozzarella light', kcal: 530, c: 70, p: 28, g: 14 },
    { id: 'd36', cat: 'Primi', name: 'Tortellini in Brodo o al Sugo', sub: '125g tortellini freschi alla carne • 10g parmigiano', kcal: 460, c: 54, p: 22, g: 16 },
    { id: 'd37', cat: 'Primi', name: 'Lasagna / Pasta al Forno (Porzione Media)', sub: '1 porzione media da 280g', kcal: 620, c: 58, p: 34, g: 26 },

    // --- SECONDI CARNE & UOVA ---
    { id: 'd38', cat: 'Secondi', name: 'Petto di Pollo alla Piastra + Pane', sub: '180g pollo • verdura a scelta • 70g pane • olio', kcal: 490, c: 42, p: 48, g: 13 },
    { id: 'd39', cat: 'Secondi', name: 'Cotoletta di Pollo al Forno + Patate', sub: '180g pollo panato • 250g patate al forno • olio', kcal: 580, c: 58, p: 48, g: 16 },
    { id: 'd40', cat: 'Secondi', name: 'Straccetti di Tacchino alla Pizzaiola + Pane', sub: '170g tacchino • pomodoro • 60g mozzarella light • 70g pane', kcal: 560, c: 44, p: 52, g: 18 },
    { id: 'd41', cat: 'Secondi', name: 'Pollo al Forno con Patate Rustiche', sub: '200g sovracoscia/petto • 250g patate • olio', kcal: 590, c: 48, p: 48, g: 22 },
    { id: 'd42', cat: 'Secondi', name: 'Tagliata di Manzo Rucola e Grana + Pane', sub: '200g manzo magro • 15g grana • 60g pane • olio', kcal: 570, c: 36, p: 54, g: 22 },
    { id: 'd43', cat: 'Secondi', name: 'Polpette di Manzo al Sugo + Pane', sub: '180g macinato magro • sugo • 70g pane • olio', kcal: 565, c: 44, p: 46, g: 21 },
    { id: 'd44', cat: 'Secondi', name: '2 Hamburger di Pollo/Tacchino + Patate', sub: '200g burger tacchino • 250g patate airfryer • olio', kcal: 575, c: 48, p: 46, g: 21 },
    { id: 'd45', cat: 'Secondi', name: 'Lonza di Maiale in Padella + Pane', sub: '200g lonza magra • verdura • 70g pane • olio', kcal: 530, c: 42, p: 50, g: 17 },
    { id: 'd46', cat: 'Secondi', name: 'Frittata Soffice Uova e Cotto + Pane', sub: '2 uova + 100ml albume • 50g cotto • 70g pane', kcal: 520, c: 42, p: 41, g: 19 },

    // --- SECONDI DI PESCE ---
    { id: 'd47', cat: 'Secondi', name: 'Trancio di Salmone Croccante + Patate', sub: '160g salmone • 250g patate al forno • verdura', kcal: 580, c: 48, p: 38, g: 24 },
    { id: 'd48', cat: 'Secondi', name: 'Fish & Chips Fit al Forno / Airfryer', sub: '200g merluzzo panato • 300g patate a spicchi • olio', kcal: 590, c: 68, p: 46, g: 14 },
    { id: 'd49', cat: 'Secondi', name: 'Filetti di Orata o Branzino + Patate', sub: '220g orata/branzino • 250g patate • olio', kcal: 540, c: 46, p: 46, g: 18 },
    { id: 'd50', cat: 'Secondi', name: 'Pesce Spada o Tonno alla Griglia + Pane', sub: '200g pesce spada • insalata • 70g pane • olio', kcal: 530, c: 42, p: 48, g: 18 },
    { id: 'd51', cat: 'Secondi', name: 'Gamberoni / Calamari in Padella + Crostoni', sub: '250g gamberoni/calamari • 70g pane tostato • olio', kcal: 510, c: 42, p: 46, g: 16 },

    // --- PANINI, PIADINE, BURGER & SFIZI ---
    { id: 'd52', cat: 'Panini & Sfizi', name: 'Piadina Tacchino, Mozzarella e Insalata', sub: '1 piadina • 100g fesa tacchino • 60g mozzarella light', kcal: 520, c: 46, p: 42, g: 18 },
    { id: 'd53', cat: 'Panini & Sfizi', name: 'Piadina Crudo Magro, Stracchino e Rucola', sub: '1 piadina • 90g crudo sgrassato • 40g stracchino', kcal: 550, c: 46, p: 38, g: 22 },
    { id: 'd54', cat: 'Panini & Sfizi', name: 'Piadina Bresaola, Philadelphia e Rucola', sub: '1 piadina • 90g bresaola • 35g philadelphia light', kcal: 490, c: 45, p: 42, g: 15 },
    { id: 'd55', cat: 'Panini & Sfizi', name: 'Piadina-Pizza in Padella con Cotto/Fesa', sub: '1 piadina • pomodoro • 80g mozzarella light • 80g cotto', kcal: 545, c: 46, p: 44, g: 19 },
    { id: 'd56', cat: 'Panini & Sfizi', name: 'Club Sandwich Bresaola e Scaglie di Grana', sub: '100g pane tostato • 90g bresaola • 20g parmigiano', kcal: 530, c: 52, p: 46, g: 14 },
    { id: 'd57', cat: 'Panini & Sfizi', name: 'Doppio Toast Prosciutto Cotto e Scamorza', sub: '4 fette pancarré • 100g cotto magro • 40g scamorza', kcal: 515, c: 44, p: 38, g: 19 },
    { id: 'd58', cat: 'Panini & Sfizi', name: 'Panino Ciabatta Tacchino e Mozzarella', sub: '90g ciabatta • 110g tacchino • 50g mozzarella light', kcal: 495, c: 50, p: 44, g: 12 },
    { id: 'd59', cat: 'Panini & Sfizi', name: 'Burger di Pollo Crispy Fatto in Casa', sub: '1 panino burger • 160g pollo panato • zucchine', kcal: 560, c: 48, p: 48, g: 18 },
    { id: 'd60', cat: 'Panini & Sfizi', name: 'Smash Burger Fit di Manzo in Panino', sub: '1 panino burger • 180g manzo magro • sottiletta light', kcal: 610, c: 42, p: 52, g: 24 },
    { id: 'd61', cat: 'Panini & Sfizi', name: 'Fajitas Messicane Pollo o Manzo (2 Tortillas)', sub: '2 tortillas • 160g carne • peperoni • yogurt greco', kcal: 580, c: 52, p: 48, g: 19 },

    // --- PIATTI FREDDI VELOCI & PASTI FUORI ---
    { id: 'd62', cat: 'Veloci & Fuori', name: 'Caprese Mozzarella Light, Crudo e Pane', sub: '125g mozzarella light • 60g crudo • pomodori • 60g pane', kcal: 510, c: 36, p: 46, g: 19 },
    { id: 'd63', cat: 'Veloci & Fuori', name: 'Carpaccio Bresaola, Rucola, Grana e Pane', sub: '100g bresaola • 20g grana • 70g pane • olio', kcal: 515, c: 40, p: 48, g: 17 },
    { id: 'd64', cat: 'Veloci & Fuori', name: 'Fiocchi di Latte, Tonno e Crackers/Pane', sub: '150g fiocchi di latte • 80g tonno • 60g pane/crackers', kcal: 470, c: 38, p: 46, g: 13 },
    { id: 'd65', cat: 'Veloci & Fuori', name: 'Insalatona Mista con Tonno, Uova e Mais', sub: 'Insalata • 120g tonno • 1 uovo sodo • mais • 50g pane', kcal: 490, c: 40, p: 42, g: 17 },
    { id: 'd66', cat: 'Veloci & Fuori', name: 'Insalatona Pollo Grigliato e Patate Lesse', sub: '160g petto di pollo • 250g patate lesse • olio', kcal: 510, c: 48, p: 46, g: 14 },
    { id: 'd67', cat: 'Veloci & Fuori', name: 'Poke Bowl Riso, Salmone e Edamame', sub: '1 poke media con riso, salmone, avocado e verdure', kcal: 640, c: 72, p: 36, g: 22 },
    { id: 'd68', cat: 'Veloci & Fuori', name: 'Sushi Misto (12 Pezzi tra Nigiri e Roll)', sub: '12 pezzi misti salmone/tonno', kcal: 580, c: 78, p: 28, g: 15 },
    { id: 'd69', cat: 'Veloci & Fuori', name: 'Pizza Margherita Classica (Pizzeria)', sub: '1 pizza margherita intera', kcal: 820, c: 115, p: 34, g: 24 },
    { id: 'd70', cat: 'Veloci & Fuori', name: 'Pizza con Bresaola o Crudo', sub: '1 pizza con aggiunta di affettato magro', kcal: 890, c: 115, p: 48, g: 26 },
    { id: 'd71', cat: 'Veloci & Fuori', name: 'Hamburger Gourmet + Patatine (Pub)', sub: '1 burger completo da pub con porzione patatine', kcal: 950, c: 75, p: 48, g: 48 },
    { id: 'd72', cat: 'Veloci & Fuori', name: 'Birra Piccola / Calice di Vino (330ml / 150ml)', sub: '1 bevanda alcolica serale', kcal: 135, c: 10, p: 1, g: 0 }
];

// DATABASE INGREDIENTI SINGOLI SFUSI (Valori per 100g/ml o 1 pezzo)
const rawIngredientsDB = [
    // Carboidrati
    { id: 'i1', cat: 'Carboidrati', name: 'Pasta di semola / Integrale (cruda)', unit: 'g', refQty: 100, kcal: 355, c: 73, p: 12, g: 1.5 },
    { id: 'i2', cat: 'Carboidrati', name: 'Riso Basmati / Classico (crudo)', unit: 'g', refQty: 100, kcal: 350, c: 78, p: 8, g: 1 },
    { id: 'i3', cat: 'Carboidrati', name: 'Gnocchi di patate', unit: 'g', refQty: 100, kcal: 155, c: 33, p: 4, g: 0.5 },
    { id: 'i4', cat: 'Carboidrati', name: 'Patate crude (forno / airfryer / lesse)', unit: 'g', refQty: 100, kcal: 80, c: 18, p: 2, g: 0.1 },
    { id: 'i5', cat: 'Carboidrati', name: 'Pane comune / Ciabatta / Rosetta', unit: 'g', refQty: 100, kcal: 265, c: 54, p: 8.5, g: 1.5 },
    { id: 'i6', cat: 'Carboidrati', name: 'Pancarré / Pane in cassetta / Panino Burger', unit: 'g', refQty: 100, kcal: 275, c: 50, p: 9, g: 4 },
    { id: 'i7', cat: 'Carboidrati', name: 'Piadina sfogliata / Tortillas', unit: 'g', refQty: 100, kcal: 310, c: 52, p: 8, g: 7.5 },
    { id: 'i8', cat: 'Carboidrati', name: 'Cornflakes / Fiocchi d\'avena / Farina d\'avena', unit: 'g', refQty: 100, kcal: 370, c: 75, p: 10, g: 3 },
    { id: 'i9', cat: 'Carboidrati', name: 'Crackers / Taralli / Grissini / Fette biscottate', unit: 'g', refQty: 100, kcal: 410, c: 72, p: 10, g: 9 },
    { id: 'i10', cat: 'Carboidrati', name: 'Gallette di riso o mais', unit: 'g', refQty: 100, kcal: 380, c: 80, p: 8, g: 2 },
    { id: 'i11', cat: 'Carboidrati', name: 'Biscotti secchi classici', unit: 'g', refQty: 100, kcal: 430, c: 74, p: 8, g: 11 },
    // Proteine
    { id: 'i12', cat: 'Proteine', name: 'Petto di Pollo / Tacchino (crudo)', unit: 'g', refQty: 100, kcal: 110, c: 0, p: 23, g: 1.5 },
    { id: 'i13', cat: 'Proteine', name: 'Macinato magro di Manzo / Tagliata / Straccetti', unit: 'g', refQty: 100, kcal: 135, c: 0, p: 21, g: 5.5 },
    { id: 'i14', cat: 'Proteine', name: 'Lonza / Arista di Maiale magra', unit: 'g', refQty: 100, kcal: 130, c: 0, p: 22, g: 4.5 },
    { id: 'i15', cat: 'Proteine', name: 'Merluzzo / Platessa / Orata / Branzino / Spada', unit: 'g', refQty: 100, kcal: 85, c: 0, p: 18, g: 1.2 },
    { id: 'i16', cat: 'Proteine', name: 'Salmone fresco o affumicato', unit: 'g', refQty: 100, kcal: 185, c: 0, p: 20, g: 12 },
    { id: 'i17', cat: 'Proteine', name: 'Gamberoni / Mazzancolle / Calamari', unit: 'g', refQty: 100, kcal: 80, c: 1, p: 17, g: 1 },
    { id: 'i18', cat: 'Proteine', name: 'Tonno al naturale sgocciolato', unit: 'g', refQty: 100, kcal: 105, c: 0, p: 24, g: 1 },
    { id: 'i19', cat: 'Proteine', name: 'Fesa di Tacchino arrosto (affettato)', unit: 'g', refQty: 100, kcal: 105, c: 1, p: 22, g: 1.5 },
    { id: 'i20', cat: 'Proteine', name: 'Bresaola della Valtellina', unit: 'g', refQty: 100, kcal: 150, c: 0, p: 32, g: 2.5 },
    { id: 'i21', cat: 'Proteine', name: 'Prosciutto Cotto magro / Crudo sgrassato', unit: 'g', refQty: 100, kcal: 145, c: 1, p: 22, g: 6 },
    { id: 'i22', cat: 'Proteine', name: 'Uovo intero (inserisci numero uova)', unit: 'pz', refQty: 1, kcal: 75, c: 0.5, p: 6.5, g: 5.2 },
    { id: 'i23', cat: 'Proteine', name: 'Albume d\'uovo liquido', unit: 'ml', refQty: 100, kcal: 48, c: 0.8, p: 11, g: 0 },
    { id: 'i24', cat: 'Proteine', name: 'Proteine Whey in polvere', unit: 'g', refQty: 100, kcal: 380, c: 6, p: 80, g: 4 },
    // Latticini & Formaggi
    { id: 'i25', cat: 'Latticini', name: 'Mozzarella Light / Fiocchi di Latte', unit: 'g', refQty: 100, kcal: 160, c: 2, p: 19, g: 8.5 },
    { id: 'i26', cat: 'Latticini', name: 'Mozzarella classica / Scamorza / Stracchino', unit: 'g', refQty: 100, kcal: 250, c: 2, p: 18, g: 19 },
    { id: 'i27', cat: 'Latticini', name: 'Philadelphia Light / Spalmabile Light', unit: 'g', refQty: 100, kcal: 150, c: 4, p: 10, g: 10 },
    { id: 'i28', cat: 'Latticini', name: 'Parmigiano Reggiano / Grana / Pecorino', unit: 'g', refQty: 100, kcal: 390, c: 0, p: 32, g: 29 },
    { id: 'i29', cat: 'Latticini', name: 'Yogurt Greco 0% / Skyr', unit: 'g', refQty: 100, kcal: 58, c: 4, p: 10.3, g: 0 },
    { id: 'i30', cat: 'Latticini', name: 'Budino Proteico / Mousse Proteica', unit: 'g', refQty: 100, kcal: 80, c: 6, p: 10, g: 1.5 },
    { id: 'i31', cat: 'Latticini', name: 'Latte parzialmente scremato', unit: 'ml', refQty: 100, kcal: 46, c: 5, p: 3.3, g: 1.6 },
    // Legumi, Frutta, Verdura & Grassi
    { id: 'i32', cat: 'Altro', name: 'Ceci / Fagioli / Lenticchie / Piselli (cotti)', unit: 'g', refQty: 100, kcal: 110, c: 17, p: 7, g: 1.5 },
    { id: 'i33', cat: 'Altro', name: 'Frutta fresca (Mela, Banana, Pera, Arancia)', unit: 'g', refQty: 100, kcal: 60, c: 14, p: 0.5, g: 0.2 },
    { id: 'i34', cat: 'Altro', name: 'Verdura mista (Zucchine, Pomodori, Insalata)', unit: 'g', refQty: 100, kcal: 22, c: 4, p: 1.2, g: 0.2 },
    { id: 'i35', cat: 'Grassi', name: 'Olio EVO (5g = 1 cucchiaino, 10g = 1 cucchiaio)', unit: 'g', refQty: 100, kcal: 900, c: 0, p: 0, g: 100 },
    { id: 'i36', cat: 'Grassi', name: 'Cioccolato Fondente / Burro Arachidi / Mandorle / Noci', unit: 'g', refQty: 100, kcal: 580, c: 25, p: 15, g: 48 },
    { id: 'i37', cat: 'Grassi', name: 'Marmellata / Miele', unit: 'g', refQty: 100, kcal: 250, c: 60, p: 0.5, g: 0 }
];

function parseMacroNumber(str, fallback) {
    if (!str) return fallback;
    const cleaned = String(str).replace(/\./g, '').replace(',', '.');
    const m = cleaned.match(/\d+(\.\d+)?/);
    return m ? Math.round(parseFloat(m[0])) : fallback;
}

function getComposerTargets(u) {
    const dayObj = (u.weekData && u.weekData[currentDayIndex]) ? u.weekData[currentDayIndex] : null;
    return {
        kcal: dayObj ? parseMacroNumber(dayObj.kcal, 1950) : 1950,
        c: dayObj ? parseMacroNumber(dayObj.c, 200) : 200,
        p: dayObj ? parseMacroNumber(dayObj.p, 160) : 160,
        g: dayObj ? parseMacroNumber(dayObj.g, 57) : 57
    };
}

function ensureUserComposerLog(u) {
    if (!u.customDailyLogs) u.customDailyLogs = {};
    const dayKey = (u.weekData && u.weekData[currentDayIndex]) ? u.weekData[currentDayIndex].id : 'today';
    if (!u.customDailyLogs[dayKey]) {
        u.customDailyLogs[dayKey] = { colazione: [], spuntino: [], pranzo: [], merenda: [], cena: [] };
    }
    return u.customDailyLogs[dayKey];
}

function initComposerSelectors() {
    const ingSel = document.getElementById('comp-ing-select');
    if (ingSel && ingSel.options.length === 0) {
        ingSel.innerHTML = rawIngredientsDB.map(ing =>
            `<option value="${ing.id}">[${ing.cat}] ${ing.name}</option>`
        ).join('');
        updateIngredientPreview();
    }
    renderDishLibraryList();
}

function setDishCategoryFilter(cat) {
    activeDishCategory = cat;
    const cats = ['Tutti', 'Colazione', 'Spuntini', 'Primi', 'Secondi', 'Panini & Sfizi', 'Veloci & Fuori'];
    cats.forEach(c => {
        const btn = document.getElementById(`cat-pill-${c}`);
        if (!btn) return;
        btn.className = c === cat
            ? 'px-3.5 py-2 rounded-xl text-sm font-extrabold bg-zinc-950 text-white shrink-0 shadow-sm transition'
            : 'px-3.5 py-2 rounded-xl text-sm font-bold bg-zinc-100 text-zinc-700 shrink-0 transition';
    });
    renderDishLibraryList();
}

function renderDishLibraryList() {
    const listContainer = document.getElementById('comp-dishes-cards-list');
    if (!listContainer) return;
    const searchVal = (document.getElementById('comp-dish-search')?.value || '').trim().toLowerCase();

    const filtered = readyDishesLibrary.filter(d => {
        const matchCat = activeDishCategory === 'Tutti' || d.cat === activeDishCategory;
        const matchSearch = !searchVal || d.name.toLowerCase().includes(searchVal) || d.sub.toLowerCase().includes(searchVal);
        return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
        listContainer.innerHTML = `<div class="p-5 text-center text-sm font-semibold text-zinc-500 bg-zinc-50 rounded-2xl border border-zinc-200">Nessun piatto trovato. Prova un altro termine o usa "Ingredienti Sfusi".</div>`;
        return;
    }

    listContainer.innerHTML = filtered.map(d => `
        <div onclick="addDishByIdToLog('${d.id}')" class="p-3.5 rounded-2xl bg-zinc-50 hover:bg-emerald-50/40 border border-zinc-200 flex items-center justify-between gap-3 cursor-pointer active:scale-99 transition">
            <div class="min-w-0 flex-1">
                <div class="flex items-center gap-2">
                    <span class="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-zinc-200 text-zinc-800">${d.cat}</span>
                    <span class="text-xs font-extrabold text-emerald-800">${d.c}C • ${d.p}P • ${d.g}G</span>
                </div>
                <div class="text-base font-black text-zinc-950 leading-snug mt-1">${d.name}</div>
                <div class="text-xs font-medium text-zinc-500 truncate mt-0.5">${d.sub}</div>
            </div>
            <div class="flex items-center gap-2.5 shrink-0">
                <div class="text-right">
                    <span class="block text-base font-black text-zinc-950">${d.kcal}</span>
                    <span class="block text-[10px] font-bold uppercase text-zinc-500">kcal</span>
                </div>
                <div class="w-11 h-11 rounded-xl bg-zinc-950 text-white flex items-center justify-center font-black text-lg shadow-sm">
                    +
                </div>
            </div>
        </div>
    `).join('');
}

function addDishByIdToLog(dishId) {
    const u = currentUser();
    const log = ensureUserComposerLog(u);
    const dish = readyDishesLibrary.find(d => d.id === dishId);
    if (!dish) return;
    log[activeComposerSlot].push({
        uid: Date.now() + Math.random(),
        name: dish.name,
        kcal: dish.kcal,
        c: dish.c,
        p: dish.p,
        g: dish.g
    });
    saveState();
    renderComposerView();
}

function selectComposerSlot(slotId) {
    activeComposerSlot = slotId;
    composerMealSlots.forEach(s => {
        const btn = document.getElementById(`slot-btn-${s.id}`);
        if (!btn) return;
        btn.className = s.id === slotId
            ? 'py-3 px-1 rounded-xl text-xs font-extrabold bg-zinc-950 text-white shadow-sm transition'
            : 'py-3 px-1 rounded-xl text-xs font-bold bg-zinc-100 text-zinc-700 transition';
    });
    const activeLabel = composerMealSlots.find(x => x.id === slotId)?.label || 'Pasto';
    const slotBadge = document.getElementById('comp-active-slot-badge');
    if (slotBadge) slotBadge.textContent = `Aggiungi a: ${activeLabel}`;
}

function switchComposerMode(mode) {
    activeComposerMode = mode;
    const dishBox = document.getElementById('comp-box-dishes');
    const ingBox = document.getElementById('comp-box-ingredients');
    const btnDish = document.getElementById('comp-mode-dishes');
    const btnIng = document.getElementById('comp-mode-ingredients');
    if (mode === 'dishes') {
        dishBox.classList.remove('hidden');
        ingBox.classList.add('hidden');
        btnDish.className = 'py-3 rounded-lg font-extrabold text-sm bg-white text-zinc-950 shadow-sm transition';
        btnIng.className = 'py-3 rounded-lg font-semibold text-sm text-zinc-600 transition';
    } else {
        dishBox.classList.add('hidden');
        ingBox.classList.remove('hidden');
        btnIng.className = 'py-3 rounded-lg font-extrabold text-sm bg-white text-zinc-950 shadow-sm transition';
        btnDish.className = 'py-3 rounded-lg font-semibold text-sm text-zinc-600 transition';
        updateIngredientPreview();
    }
}

function updateIngredientPreview() {
    const ingId = document.getElementById('comp-ing-select')?.value;
    const qty = parseFloat(document.getElementById('comp-ing-qty')?.value) || 0;
    const ing = rawIngredientsDB.find(x => x.id === ingId);
    if (!ing) return;
    const ratio = qty / ing.refQty;
    document.getElementById('comp-ing-preview-kcal').textContent = `${Math.round(ing.kcal * ratio)} kcal (${qty}${ing.unit})`;
    document.getElementById('comp-ing-preview-macros').textContent = `${Math.round(ing.c * ratio)}g C • ${Math.round(ing.p * ratio)}g P • ${Math.round(ing.g * ratio)}g G`;
}

function addSelectedIngredientToLog() {
    const u = currentUser();
    const log = ensureUserComposerLog(u);
    const ingId = document.getElementById('comp-ing-select').value;
    const qty = parseFloat(document.getElementById('comp-ing-qty').value) || 0;
    const ing = rawIngredientsDB.find(x => x.id === ingId);
    if (!ing || qty <= 0) return;
    const ratio = qty / ing.refQty;
    log[activeComposerSlot].push({
        uid: Date.now() + Math.random(),
        name: `${qty}${ing.unit} ${ing.name.replace(' (cruda)', '').replace(' (crudo)', '').replace(' (inserisci numero uova)', '')}`,
        kcal: Math.round(ing.kcal * ratio),
        c: Math.round(ing.c * ratio),
        p: Math.round(ing.p * ratio),
        g: Math.round(ing.g * ratio)
    });
    saveState();
    renderComposerView();
}

function removeComposerEntry(slotId, idx) {
    const u = currentUser();
    const log = ensureUserComposerLog(u);
    if (log[slotId]) {
        log[slotId].splice(idx, 1);
        saveState();
        renderComposerView();
    }
}

function resetComposerDay() {
    if (!confirm('Azzerare tutti i piatti inseriti oggi nel Compositore?')) return;
    const u = currentUser();
    const dayKey = (u.weekData && u.weekData[currentDayIndex]) ? u.weekData[currentDayIndex].id : 'today';
    if (!u.customDailyLogs) u.customDailyLogs = {};
    u.customDailyLogs[dayKey] = { colazione: [], spuntino: [], pranzo: [], merenda: [], cena: [] };
    saveState();
    renderComposerView();
}

function renderComposerView() {
    initComposerSelectors();
    const u = currentUser();
    const targets = getComposerTargets(u);
    const log = ensureUserComposerLog(u);

    let totKcal = 0, totC = 0, totP = 0, totG = 0;
    composerMealSlots.forEach(s => {
        (log[s.id] || []).forEach(item => {
            totKcal += item.kcal; totC += item.c; totP += item.p; totG += item.g;
        });
    });

    document.getElementById('comp-kcal-target').textContent = targets.kcal;
    document.getElementById('comp-c-target').textContent = targets.c;
    document.getElementById('comp-p-target').textContent = targets.p;
    document.getElementById('comp-g-target').textContent = targets.g;

    document.getElementById('comp-kcal-eaten').textContent = totKcal;
    document.getElementById('comp-c-eaten').textContent = totC;
    document.getElementById('comp-p-eaten').textContent = totP;
    document.getElementById('comp-g-eaten').textContent = totG;

    const remKcal = targets.kcal - totKcal;
    const remEl = document.getElementById('comp-kcal-rem');
    remEl.textContent = remKcal >= 0 ? `Restano: ${remKcal} kcal` : `Extra: +${Math.abs(remKcal)} kcal`;
    remEl.className = remKcal >= 0
        ? 'text-xs px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-extrabold'
        : 'text-xs px-3 py-1 rounded-lg bg-red-50 text-red-700 border border-red-200 font-extrabold';

    document.getElementById('comp-c-rem').textContent = (targets.c - totC) >= 0 ? `-${targets.c - totC}g` : `+${Math.abs(targets.c - totC)}g`;
    document.getElementById('comp-p-rem').textContent = (targets.p - totP) >= 0 ? `-${targets.p - totP}g` : `+${Math.abs(targets.p - totP)}g`;
    document.getElementById('comp-g-rem').textContent = (targets.g - totG) >= 0 ? `-${targets.g - totG}g` : `+${Math.abs(targets.g - totG)}g`;

    document.getElementById('comp-bar-kcal').style.width = `${Math.min(100, Math.round((totKcal / targets.kcal) * 100))}%`;
    document.getElementById('comp-bar-c').style.width = `${Math.min(100, Math.round((totC / targets.c) * 100))}%`;
    document.getElementById('comp-bar-p').style.width = `${Math.min(100, Math.round((totP / targets.p) * 100))}%`;
    document.getElementById('comp-bar-g').style.width = `${Math.min(100, Math.round((totG / targets.g) * 100))}%`;

    const container = document.getElementById('comp-meals-log-container');
    container.innerHTML = composerMealSlots.map(s => {
        const items = log[s.id] || [];
        const slotKcal = items.reduce((acc, x) => acc + x.kcal, 0);
        const slotC = items.reduce((acc, x) => acc + x.c, 0);
        const slotP = items.reduce((acc, x) => acc + x.p, 0);
        const slotG = items.reduce((acc, x) => acc + x.g, 0);

        const itemsHtml = items.length === 0
            ? `<p class="text-sm text-zinc-400 font-medium py-1">Nessun piatto inserito. Seleziona "${s.short}" e tocca + su un piatto.</p>`
            : items.map((item, idx) => `
                <div class="flex justify-between items-center bg-zinc-50 px-4 py-3 rounded-xl border border-zinc-200 gap-3">
                    <div class="min-w-0 flex-1">
                        <div class="text-base font-extrabold text-zinc-950 leading-snug">${item.name}</div>
                        <div class="text-xs font-bold text-emerald-800 mt-0.5">${item.kcal} kcal • ${item.c}g C • ${item.p}g P • ${item.g}g G</div>
                    </div>
                    <button type="button" onclick="removeComposerEntry('${s.id}', ${idx})" class="w-10 h-10 rounded-xl bg-white border border-zinc-300 text-zinc-600 hover:text-red-600 flex items-center justify-center shrink-0">
                        <i class="fa-solid fa-trash-can text-sm"></i>
                    </button>
                </div>
            `).join('');

        return `
            <div class="pro-card rounded-2xl p-5 space-y-3">
                <div class="flex justify-between items-center border-b border-zinc-100 pb-2.5">
                    <button type="button" onclick="selectComposerSlot('${s.id}')" class="text-left">
                        <span class="text-lg font-black text-zinc-950">${s.label}</span>
                    </button>
                    <span class="text-xs font-extrabold px-3 py-1.5 rounded-lg bg-zinc-100 text-zinc-900">
                        ${slotKcal} kcal (${slotC}C • ${slotP}P • ${slotG}G)
                    </span>
                </div>
                <div class="space-y-2">${itemsHtml}</div>
            </div>
        `;
    }).join('');
}
