// =========================================================================
// MODULO: COMPOSITORE GIORNALIERO & MAXI LIBRERIA PIATTI (composer.js v2)
// =========================================================================

let activeComposerSlot = 'colazione';
let activeComposerMode = 'dishes';
let activeDishCategory = 'all';

const composerMealSlots = [
    { id: 'colazione', label: 'Colazione', icon: 'fa-mug-hot', defaultCat: 'colazione' },
    { id: 'spuntino', label: 'Spuntino Mattina', icon: 'fa-apple-whole', defaultCat: 'spuntini' },
    { id: 'pranzo', label: 'Pranzo', icon: 'fa-utensils', defaultCat: 'primi' },
    { id: 'merenda', label: 'Merenda Pomeriggio', icon: 'fa-cookie-bite', defaultCat: 'spuntini' },
    { id: 'cena', label: 'Cena', icon: 'fa-moon', defaultCat: 'secondi' }
];

const dishCategoriesMeta = [
    { id: 'all', label: 'Tutti' },
    { id: 'colazione', label: 'Colazione' },
    { id: 'spuntini', label: 'Spuntini' },
    { id: 'primi', label: 'Primi' },
    { id: 'secondi', label: 'Secondi' },
    { id: 'panini', label: 'Panini & Piadine' },
    { id: 'veloci', label: 'Veloci & Fuori' }
];

// MAXI LIBRERIA DI 72 PIATTI GENERICI (ID categoria puliti senza caratteri speciali)
const readyDishesLibrary = [
    // --- COLAZIONE ---
    { id: 'd1', cat: 'colazione', catLabel: 'Colazione', name: 'Yogurt Greco + Cornflakes e Fondente', sub: '170g greco 0% • 30g cornflakes • 10g fondente', kcal: 300, c: 38, p: 22, g: 6 },
    { id: 'd2', cat: 'colazione', catLabel: 'Colazione', name: 'Latte + 4 Fette Biscottate e Marmellata', sub: '200ml latte • 4 fette biscottate • 2 cucchiaini marmellata', kcal: 295, c: 42, p: 12, g: 6 },
    { id: 'd3', cat: 'colazione', catLabel: 'Colazione', name: 'Toast Salato Tacchino e Philadelphia', sub: '2 fette pancarré (60g) • 50g tacchino • velo spalmabile', kcal: 305, c: 34, p: 23, g: 8 },
    { id: 'd4', cat: 'colazione', catLabel: 'Colazione', name: 'Pancake Proteici Avena e Arachidi', sub: '50g farina avena • 120ml albume • 15g burro arachidi', kcal: 380, c: 42, p: 26, g: 11 },
    { id: 'd5', cat: 'colazione', catLabel: 'Colazione', name: 'Porridge Caldo Avena, Mela e Noci', sub: '50g fiocchi avena • 150ml latte • 1 mela • 10g noci', kcal: 360, c: 52, p: 14, g: 10 },
    { id: 'd6', cat: 'colazione', catLabel: 'Colazione', name: 'Uova Strapazzate e Pane Tostato', sub: '2 uova intere • 60g pane tostato', kcal: 310, c: 30, p: 18, g: 12 },
    { id: 'd7', cat: 'colazione', catLabel: 'Colazione', name: 'Cappuccino e Cornetto Semplice (Bar)', sub: '1 cappuccino • 1 brioche classica da bar', kcal: 390, c: 48, p: 10, g: 17 },
    { id: 'd8', cat: 'colazione', catLabel: 'Colazione', name: 'Latte e Biscotti Secchi (Classica)', sub: '250ml latte parz. scremato • 40g biscotti secchi', kcal: 290, c: 41, p: 11, g: 8 },
    { id: 'd9', cat: 'colazione', catLabel: 'Colazione', name: 'French Toast Proteico con Miele', sub: '2 fette pane • 120ml albume • 10g miele', kcal: 270, c: 38, p: 21, g: 3 },
    { id: 'd10', cat: 'colazione', catLabel: 'Colazione', name: 'Toast Salmone Affumicato e Philadelphia', sub: '60g pane • 60g salmone • 25g spalmabile light', kcal: 315, c: 31, p: 21, g: 11 },

    // --- SPUNTINI & MERENDE ---
    { id: 'd11', cat: 'spuntini', catLabel: 'Spuntino', name: 'Budino o Mousse Proteica', sub: '1 vasetto da 200g (cioccolato o vaniglia)', kcal: 160, c: 12, p: 20, g: 3 },
    { id: 'd12', cat: 'spuntini', catLabel: 'Spuntino', name: 'Pacchetto Crackers + Fesa di Tacchino', sub: '1 pacchetto crackers • 50g fesa di tacchino', kcal: 175, c: 20, p: 16, g: 3 },
    { id: 'd13', cat: 'spuntini', catLabel: 'Spuntino', name: '3 Gallette di Mais + Bresaola', sub: '3 gallette di mais • 50g bresaola', kcal: 165, c: 18, p: 18, g: 2 },
    { id: 'd14', cat: 'spuntini', catLabel: 'Spuntino', name: 'Frutto Fresco + Pezzetto Parmigiano', sub: '1 mela/banana/pera • 20g Parmigiano Reggiano', kcal: 165, c: 20, p: 7, g: 6 },
    { id: 'd15', cat: 'spuntini', catLabel: 'Spuntino', name: 'Parmigiano a Cubetti + Taralli', sub: '30g Parmigiano • 25g taralli o grissini', kcal: 230, c: 17, p: 12, g: 13 },
    { id: 'd16', cat: 'spuntini', catLabel: 'Spuntino', name: 'Yogurt Greco 0% + Frutto Fresco', sub: '170g yogurt greco • 1 frutto medio', kcal: 175, c: 24, p: 18, g: 0 },
    { id: 'd17', cat: 'spuntini', catLabel: 'Spuntino', name: 'Barretta Proteica Classica', sub: '1 barretta da 50g (senza frutta secca)', kcal: 180, c: 18, p: 18, g: 4 },
    { id: 'd18', cat: 'spuntini', catLabel: 'Spuntino', name: 'Paninetto Piccolo al Prosciutto Crudo', sub: '40g pane comune • 50g crudo sgrassato', kcal: 195, c: 21, p: 17, g: 4 },
    { id: 'd19', cat: 'spuntini', catLabel: 'Spuntino', name: 'Yogurt Greco + 2 Gallette al Fondente', sub: '150g yogurt greco • 2 gallette ricoperte', kcal: 230, c: 26, p: 17, g: 6 },
    { id: 'd20', cat: 'spuntini', catLabel: 'Spuntino', name: 'Shaker Proteine Whey + Banana', sub: '30g whey in acqua • 1 banana media', kcal: 220, c: 25, p: 25, g: 2 },

    // --- PRIMI PIATTI ---
    { id: 'd21', cat: 'primi', catLabel: 'Primo', name: 'Pasta al Pomodoro e Parmigiano', sub: '80g pasta • passata • 10g parmigiano • olio', kcal: 430, c: 64, p: 14, g: 12 },
    { id: 'd22', cat: 'primi', catLabel: 'Primo', name: 'Pasta al Ragù Magro di Manzo', sub: '80g pasta • 120g macinato magro • sugo • olio', kcal: 560, c: 64, p: 38, g: 16 },
    { id: 'd23', cat: 'primi', catLabel: 'Primo', name: 'Pasta al Ragù Bianco di Pollo/Tacchino', sub: '80g pasta • 130g macinato pollo • olio', kcal: 530, c: 62, p: 42, g: 12 },
    { id: 'd24', cat: 'primi', catLabel: 'Primo', name: 'Pasta Tonno e Pomodorini', sub: '80g pasta • 120g tonno naturale • pomodorini • olio', kcal: 510, c: 63, p: 40, g: 11 },
    { id: 'd25', cat: 'primi', catLabel: 'Primo', name: 'Pasta Cremosa Tonno e Philadelphia', sub: '80g pasta • 120g tonno • 30g philadelphia light', kcal: 540, c: 65, p: 44, g: 11 },
    { id: 'd26', cat: 'primi', catLabel: 'Primo', name: 'Pasta Crema di Zucchine e Cotto', sub: '80g pasta • 80g cotto a dadini • zucchine • parmigiano', kcal: 550, c: 66, p: 32, g: 16 },
    { id: 'd27', cat: 'primi', catLabel: 'Primo', name: 'Pasta alla Carbonara Fit', sub: '80g pasta • uovo+albume • 60g cotto/fesa • pecorino', kcal: 570, c: 64, p: 36, g: 18 },
    { id: 'd28', cat: 'primi', catLabel: 'Primo', name: 'Pasta Pesto e Pollo a Cubetti', sub: '80g pasta • 120g pollo • 20g pesto alla genovese', kcal: 565, c: 62, p: 39, g: 17 },
    { id: 'd29', cat: 'primi', catLabel: 'Primo', name: 'Pasta e Ceci con Tacchino Rosolato', sub: '80g pasta • 100g ceci • 80g tacchino • olio', kcal: 580, c: 74, p: 38, g: 14 },
    { id: 'd30', cat: 'primi', catLabel: 'Primo', name: 'Pasta e Lenticchie Completa', sub: '80g pasta • 150g lenticchie cotte • olio', kcal: 495, c: 82, p: 22, g: 9 },
    { id: 'd31', cat: 'primi', catLabel: 'Primo', name: 'Riso Basmati Pollo e Zucchine', sub: '80g riso • 150g petto di pollo • zucchine • olio', kcal: 540, c: 66, p: 43, g: 11 },
    { id: 'd32', cat: 'primi', catLabel: 'Primo', name: 'Riso Basmati Tonno, Uova Sode e Piselli', sub: '80g riso • 80g tonno • 2 uova sode • olio', kcal: 590, c: 65, p: 44, g: 17 },
    { id: 'd33', cat: 'primi', catLabel: 'Primo', name: 'Riso Basmati Salmone e Zucchine', sub: '80g riso • 120g salmone • zucchine • olio', kcal: 575, c: 64, p: 33, g: 20 },
    { id: 'd34', cat: 'primi', catLabel: 'Primo', name: 'Gnocchi Express al Ragù di Pollo/Manzo', sub: '200g gnocchi di patate • 130g macinato magro • olio', kcal: 545, c: 68, p: 41, g: 11 },
    { id: 'd35', cat: 'primi', catLabel: 'Primo', name: 'Gnocchi alla Sorrentina Light', sub: '200g gnocchi • pomodoro • 100g mozzarella light', kcal: 530, c: 70, p: 28, g: 14 },
    { id: 'd36', cat: 'primi', catLabel: 'Primo', name: 'Tortellini alla Carne (in Brodo o Sugo)', sub: '125g tortellini freschi • 10g parmigiano', kcal: 460, c: 54, p: 22, g: 16 },
    { id: 'd37', cat: 'primi', catLabel: 'Primo', name: 'Lasagna / Pasta al Forno', sub: '1 porzione media da 280g', kcal: 620, c: 58, p: 34, g: 26 },

    // --- SECONDI CARNE, PESCE & UOVA ---
    { id: 'd38', cat: 'secondi', catLabel: 'Secondo', name: 'Petto di Pollo alla Piastra + Pane', sub: '180g pollo • verdura a scelta • 70g pane • olio', kcal: 490, c: 42, p: 48, g: 13 },
    { id: 'd39', cat: 'secondi', catLabel: 'Secondo', name: 'Cotoletta di Pollo al Forno + Patate', sub: '180g pollo panato • 250g patate al forno • olio', kcal: 580, c: 58, p: 48, g: 16 },
    { id: 'd40', cat: 'secondi', catLabel: 'Secondo', name: 'Straccetti Tacchino "Pizzaiola Filante" + Pane', sub: '170g tacchino • pomodoro • 60g mozzarella light • 80g pane', kcal: 580, c: 46, p: 54, g: 18 },
    { id: 'd41', cat: 'secondi', catLabel: 'Secondo', name: 'Pollo al Forno con Patate Rustiche', sub: '200g sovracoscia/petto • 250g patate • olio', kcal: 590, c: 48, p: 48, g: 22 },
    { id: 'd42', cat: 'secondi', catLabel: 'Secondo', name: 'Tagliata di Manzo Rucola e Grana + Pane', sub: '200g manzo magro • 15g grana • 60g pane • olio', kcal: 570, c: 36, p: 54, g: 22 },
    { id: 'd43', cat: 'secondi', catLabel: 'Secondo', name: 'Polpette di Manzo al Sugo + Pane', sub: '180g macinato magro • sugo • 70g pane • olio', kcal: 565, c: 44, p: 46, g: 21 },
    { id: 'd44', cat: 'secondi', catLabel: 'Secondo', name: '2 Hamburger di Tacchino + Patate', sub: '200g burger tacchino • 250g patate airfryer • olio', kcal: 575, c: 48, p: 46, g: 21 },
    { id: 'd45', cat: 'secondi', catLabel: 'Secondo', name: 'Lonza di Maiale in Padella + Pane', sub: '200g lonza magra • verdura • 70g pane • olio', kcal: 530, c: 42, p: 50, g: 17 },
    { id: 'd46', cat: 'secondi', catLabel: 'Secondo', name: 'Uova Strapazzate Cremose, Cotto e Crostoni', sub: '2 uova + 100ml albume • 50g cotto • 90g pane tostato', kcal: 560, c: 48, p: 44, g: 20 },
    { id: 'd47', cat: 'secondi', catLabel: 'Secondo', name: 'Salmone Croccante Teriyaki & Patate', sub: '150g salmone • 250g patate al forno • zucchine • soia', kcal: 585, c: 48, p: 38, g: 24 },
    { id: 'd48', cat: 'secondi', catLabel: 'Secondo', name: 'Fish & Chips Fit al Forno / Airfryer', sub: '200g merluzzo panato • 300g patate a spicchi • olio', kcal: 590, c: 68, p: 46, g: 14 },
    { id: 'd49', cat: 'secondi', catLabel: 'Secondo', name: 'Filetti di Orata o Branzino + Patate', sub: '220g orata/branzino • 250g patate • olio', kcal: 540, c: 46, p: 46, g: 18 },
    { id: 'd50', cat: 'secondi', catLabel: 'Secondo', name: 'Pesce Spada alla Griglia + Pane', sub: '200g pesce spada • insalata • 70g pane • olio', kcal: 530, c: 42, p: 48, g: 18 },
    { id: 'd51', cat: 'secondi', catLabel: 'Secondo', name: 'Gamberoni / Calamari in Padella + Crostoni', sub: '250g gamberoni/calamari • 70g pane tostato • olio', kcal: 510, c: 42, p: 46, g: 16 },

    // --- PANINI, PIADINE & BURGER ---
    { id: 'd52', cat: 'panini', catLabel: 'Piadina', name: 'Maxi Piadina Tacchino e Mozzarella Light', sub: '1 piadina • 100g fesa tacchino • 60g mozzarella light', kcal: 520, c: 46, p: 42, g: 18 },
    { id: 'd53', cat: 'panini', catLabel: 'Piadina', name: 'Piadina Crudo Magro, Stracchino e Rucola', sub: '1 piadina • 90g crudo sgrassato • 40g stracchino', kcal: 550, c: 46, p: 38, g: 22 },
    { id: 'd54', cat: 'panini', catLabel: 'Piadina', name: 'Piadina Bresaola, Philadelphia e Rucola', sub: '1 piadina • 90g bresaola • 35g philadelphia light', kcal: 490, c: 45, p: 42, g: 15 },
    { id: 'd55', cat: 'panini', catLabel: 'Piadina-Pizza', name: 'Piadina-Pizza Express in Padella', sub: '1 piadina • 1 uovo+albume • pomodoro • 60g mozzarella light', kcal: 550, c: 44, p: 46, g: 19 },
    { id: 'd56', cat: 'panini', catLabel: 'Sandwich', name: 'Club Sandwich Bresaola e Scaglie di Grana', sub: '100g pane tostato • 90g bresaola • 20g parmigiano', kcal: 530, c: 52, p: 46, g: 14 },
    { id: 'd57', cat: 'panini', catLabel: 'Toast', name: 'Doppio Toast Prosciutto Cotto e Scamorza', sub: '4 fette pancarré • 100g cotto magro • 40g scamorza', kcal: 515, c: 44, p: 38, g: 19 },
    { id: 'd58', cat: 'panini', catLabel: 'Panino', name: 'Panino Ciabatta Tacchino e Mozzarella', sub: '90g ciabatta • 110g tacchino • 50g mozzarella light', kcal: 495, c: 50, p: 44, g: 12 },
    { id: 'd59', cat: 'panini', catLabel: 'Burger', name: 'Burger di Pollo Crispy & Zucchine', sub: '1 panino burger (70g) • 160g pollo panato • zucchine', kcal: 560, c: 48, p: 48, g: 18 },
    { id: 'd60', cat: 'panini', catLabel: 'Burger', name: 'Smash Burger Fit di Manzo Fatto in Casa', sub: '1 panino burger • 180g manzo magro • sottiletta light', kcal: 610, c: 42, p: 52, g: 24 },
    { id: 'd61', cat: 'panini', catLabel: 'Tex-Mex', name: 'Fajitas Messicane Manzo o Pollo (2 Tortillas)', sub: '2 tortillas (80g) • 160g carne • peperoni • yogurt greco', kcal: 580, c: 52, p: 48, g: 19 },

    // --- PIATTI FREDDI VELOCI & PASTI FUORI ---
    { id: 'd62', cat: 'veloci', catLabel: 'Piatto Freddo', name: 'Caprese Mozzarella Light, Crudo e Pane', sub: '125g mozzarella light • 60g crudo • pomodori • 60g pane', kcal: 510, c: 36, p: 46, g: 19 },
    { id: 'd63', cat: 'veloci', catLabel: 'Piatto Freddo', name: 'Carpaccio Bresaola, Rucola, Grana e Pane', sub: '100g bresaola • 20g grana • 70g pane • olio', kcal: 515, c: 40, p: 48, g: 17 },
    { id: 'd64', cat: 'veloci', catLabel: 'Piatto Freddo', name: 'Fiocchi di Latte, Tonno e Crackers/Pane', sub: '150g fiocchi di latte • 80g tonno • 60g pane/crackers', kcal: 470, c: 38, p: 46, g: 13 },
    { id: 'd65', cat: 'veloci', catLabel: 'Insalatona', name: 'Insalatona Mista Tonno, Uova e Mais', sub: 'Insalata • 120g tonno • 1 uovo sodo • mais • 50g pane', kcal: 490, c: 40, p: 42, g: 17 },
    { id: 'd66', cat: 'veloci', catLabel: 'Insalatona', name: 'Insalatona Pollo Grigliato e Patate Lesse', sub: '160g petto di pollo • 250g patate lesse • olio', kcal: 510, c: 48, p: 46, g: 14 },
    { id: 'd67', cat: 'veloci', catLabel: 'Fuori Casa', name: 'Poke Bowl Riso, Salmone e Edamame', sub: '1 poke media con riso, salmone, avocado e verdure', kcal: 640, c: 72, p: 36, g: 22 },
    { id: 'd68', cat: 'veloci', catLabel: 'Fuori Casa', name: 'Sushi Misto (12 Pezzi tra Nigiri e Roll)', sub: '12 pezzi misti salmone/tonno', kcal: 580, c: 78, p: 28, g: 15 },
    { id: 'd69', cat: 'veloci', catLabel: 'Pizzeria', name: 'Pizza Margherita Classica', sub: '1 pizza margherita intera da pizzeria', kcal: 820, c: 115, p: 34, g: 24 },
    { id: 'd70', cat: 'veloci', catLabel: 'Pizzeria', name: 'Pizza con Bresaola o Crudo', sub: '1 pizza margherita con affettato magro', kcal: 890, c: 115, p: 48, g: 26 },
    { id: 'd71', cat: 'veloci', catLabel: 'Pub / Libero', name: 'Hamburger Gourmet + Patatine', sub: '1 burger completo da pub con porzione patatine', kcal: 950, c: 75, p: 48, g: 48 },
    { id: 'd72', cat: 'veloci', catLabel: 'Extra', name: 'Birra Piccola (330ml) o Calice di Vino', sub: '1 bevanda alcolica serale', kcal: 135, c: 10, p: 1, g: 0 }
];

// DATABASE INGREDIENTI SINGOLI SFUSI (Valori per 100g/ml o 1 pezzo)
const rawIngredientsDB = [
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
    { id: 'i25', cat: 'Latticini', name: 'Mozzarella Light / Fiocchi di Latte', unit: 'g', refQty: 100, kcal: 160, c: 2, p: 19, g: 8.5 },
    { id: 'i26', cat: 'Latticini', name: 'Mozzarella classica / Scamorza / Stracchino', unit: 'g', refQty: 100, kcal: 250, c: 2, p: 18, g: 19 },
    { id: 'i27', cat: 'Latticini', name: 'Philadelphia Light / Spalmabile Light', unit: 'g', refQty: 100, kcal: 150, c: 4, p: 10, g: 10 },
    { id: 'i28', cat: 'Latticini', name: 'Parmigiano Reggiano / Grana / Pecorino', unit: 'g', refQty: 100, kcal: 390, c: 0, p: 32, g: 29 },
    { id: 'i29', cat: 'Latticini', name: 'Yogurt Greco 0% / Skyr', unit: 'g', refQty: 100, kcal: 58, c: 4, p: 10.3, g: 0 },
    { id: 'i30', cat: 'Latticini', name: 'Budino Proteico / Mousse Proteica', unit: 'g', refQty: 100, kcal: 80, c: 6, p: 10, g: 1.5 },
    { id: 'i31', cat: 'Latticini', name: 'Latte parzialmente scremato', unit: 'ml', refQty: 100, kcal: 46, c: 5, p: 3.3, g: 1.6 },
    { id: 'i32', cat: 'Altro', name: 'Ceci / Fagioli / Lenticchie / Piselli (cotti)', unit: 'g', refQty: 100, kcal: 110, c: 17, p: 7, g: 1.5 },
    { id: 'i33', cat: 'Altro', name: 'Frutta fresca (Mela, Banana, Pera, Arancia)', unit: 'g', refQty: 100, kcal: 60, c: 14, p: 0.5, g: 0.2 },
    { id: 'i34', cat: 'Altro', name: 'Verdura mista (Zucchine, Pomodori, Insalata)', unit: 'g', refQty: 100, kcal: 22, c: 4, p: 1.2, g: 0.2 },
    { id: 'i35', cat: 'Grassi', name: 'Olio EVO (5g = 1 cucchiaino, 10g = 1 cucchiaio)', unit: 'g', refQty: 100, kcal: 900, c: 0, p: 0, g: 100 },
    { id: 'i36', cat: 'Grassi', name: 'Cioccolato Fondente / Burro Arachidi / Frutta Secca', unit: 'g', refQty: 100, kcal: 580, c: 25, p: 15, g: 48 },
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

// Apre il pannello di scelta cibo già puntato sul pasto giusto (es. Colazione)
function openComposerPicker(slotId) {
    activeComposerSlot = slotId;
    const slotMeta = composerMealSlots.find(s => s.id === slotId) || composerMealSlots[0];

    const modal = document.getElementById('comp-picker-modal');
    const titleEl = document.getElementById('comp-modal-slot-title');
    if (titleEl) titleEl.textContent = `Aggiungi a ${slotMeta.label}`;
    if (modal) modal.classList.remove('hidden');

    const ingSel = document.getElementById('comp-ing-select');
    if (ingSel && ingSel.options.length === 0) {
        ingSel.innerHTML = rawIngredientsDB.map(ing =>
            `<option value="${ing.id}">[${ing.cat}] ${ing.name}</option>`
        ).join('');
        updateIngredientPreview();
    }

    const searchInput = document.getElementById('comp-dish-search');
    if (searchInput) searchInput.value = '';

    // Imposta in automatico la categoria più adatta al pasto (es. Colazione -> Colazione)
    setDishCategoryFilter(slotMeta.defaultCat || 'all');
}

function closeComposerPicker() {
    const modal = document.getElementById('comp-picker-modal');
    if (modal) modal.classList.add('hidden');
}

function showComposerToast(msg) {
    const toast = document.getElementById('comp-feedback-banner');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.remove('hidden');
    clearTimeout(window._compToastTimer);
    window._compToastTimer = setTimeout(() => {
        toast.classList.add('hidden');
    }, 2200);
}

function setDishCategoryFilter(catId) {
    activeDishCategory = catId;
    const pillsBox = document.getElementById('comp-cat-pills');
    if (pillsBox) {
        pillsBox.innerHTML = dishCategoriesMeta.map(c => `
            <button type="button" onclick="setDishCategoryFilter('${c.id}')" class="${
                c.id === activeDishCategory
                    ? 'px-4 py-2 rounded-xl text-sm font-extrabold bg-zinc-950 text-white shrink-0 shadow-sm'
                    : 'px-4 py-2 rounded-xl text-sm font-bold bg-zinc-100 text-zinc-700 shrink-0'
            }">${c.label}</button>
        `).join('');
    }
    renderDishLibraryList();
}

function renderDishLibraryList() {
    const listContainer = document.getElementById('comp-dishes-cards-list');
    if (!listContainer) return;
    const searchVal = (document.getElementById('comp-dish-search')?.value || '').trim().toLowerCase();

    const filtered = readyDishesLibrary.filter(d => {
        // Se l'utente scrive nella barra di ricerca, cerca in TUTTI i 72 piatti
        if (searchVal) {
            return d.name.toLowerCase().includes(searchVal) || d.sub.toLowerCase().includes(searchVal);
        }
        return activeDishCategory === 'all' || d.cat === activeDishCategory;
    });

    if (filtered.length === 0) {
        listContainer.innerHTML = `<div class="p-6 text-center text-sm font-semibold text-zinc-500 bg-zinc-50 rounded-2xl border border-zinc-200">Nessun piatto trovato. Prova a premere "Tutti" o usa "Ingredienti Sfusi".</div>`;
        return;
    }

    listContainer.innerHTML = filtered.map(d => `
        <div onclick="addDishByIdToLog('${d.id}')" class="p-4 rounded-2xl bg-zinc-50 active:bg-emerald-50 border border-zinc-200 flex items-center justify-between gap-3 cursor-pointer transition">
            <div class="min-w-0 flex-1">
                <div class="flex items-center gap-2">
                    <span class="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-zinc-200 text-zinc-800">${d.catLabel}</span>
                    <span class="text-xs font-extrabold text-emerald-700">${d.c}g C • ${d.p}g P • ${d.g}g G</span>
                </div>
                <div class="text-base font-black text-zinc-950 leading-snug mt-1">${d.name}</div>
                <div class="text-xs font-medium text-zinc-500 mt-0.5">${d.sub}</div>
            </div>
            <div class="flex items-center gap-3 shrink-0">
                <div class="text-right">
                    <span class="block text-lg font-black text-zinc-950">${d.kcal}</span>
                    <span class="block text-[10px] font-extrabold uppercase text-zinc-500">kcal</span>
                </div>
                <button type="button" class="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-xl shadow-sm">
                    +
                </button>
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
    const slotLabel = composerMealSlots.find(s => s.id === activeComposerSlot)?.label || 'Pasto';
    showComposerToast(`✓ Aggiunto a ${slotLabel}: ${dish.name} (+${dish.kcal} kcal)`);
    closeComposerPicker();
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
        btnDish.className = 'py-2.5 rounded-lg font-extrabold text-sm bg-white text-zinc-950 shadow-sm transition';
        btnIng.className = 'py-2.5 rounded-lg font-semibold text-sm text-zinc-600 transition';
    } else {
        dishBox.classList.add('hidden');
        ingBox.classList.remove('hidden');
        btnIng.className = 'py-2.5 rounded-lg font-extrabold text-sm bg-white text-zinc-950 shadow-sm transition';
        btnDish.className = 'py-2.5 rounded-lg font-semibold text-sm text-zinc-600 transition';
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
    const cleanName = `${qty}${ing.unit} ${ing.name.replace(' (cruda)', '').replace(' (crudo)', '').replace(' (inserisci numero uova)', '')}`;
    const kcal = Math.round(ing.kcal * ratio);

    log[activeComposerSlot].push({
        uid: Date.now() + Math.random(),
        name: cleanName,
        kcal: kcal,
        c: Math.round(ing.c * ratio),
        p: Math.round(ing.p * ratio),
        g: Math.round(ing.g * ratio)
    });
    saveState();
    renderComposerView();
    const slotLabel = composerMealSlots.find(s => s.id === activeComposerSlot)?.label || 'Pasto';
    showComposerToast(`✓ Aggiunto a ${slotLabel}: ${cleanName} (+${kcal} kcal)`);
    closeComposerPicker();
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
    if (!confirm('Vuoi svuotare tutti i pasti composti oggi?')) return;
    const u = currentUser();
    const dayKey = (u.weekData && u.weekData[currentDayIndex]) ? u.weekData[currentDayIndex].id : 'today';
    if (!u.customDailyLogs) u.customDailyLogs = {};
    u.customDailyLogs[dayKey] = { colazione: [], spuntino: [], pranzo: [], merenda: [], cena: [] };
    saveState();
    renderComposerView();
}

function renderComposerView() {
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
    remEl.textContent = remKcal >= 0 ? `Restano ${remKcal} kcal` : `Sforato di +${Math.abs(remKcal)} kcal`;
    remEl.className = remKcal >= 0
        ? 'text-xs px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-extrabold'
        : 'text-xs px-3 py-1.5 rounded-xl bg-red-50 text-red-700 border border-red-200 font-extrabold';

    document.getElementById('comp-c-rem').textContent = (targets.c - totC) >= 0 ? `-${targets.c - totC}g` : `+${Math.abs(targets.c - totC)}g`;
    document.getElementById('comp-p-rem').textContent = (targets.p - totP) >= 0 ? `-${targets.p - totP}g` : `+${Math.abs(targets.p - totP)}g`;
    document.getElementById('comp-g-rem').textContent = (targets.g - totG) >= 0 ? `-${targets.g - totG}g` : `+${Math.abs(targets.g - totG)}g`;

    document.getElementById('comp-bar-kcal').style.width = `${Math.min(100, Math.round((totKcal / targets.kcal) * 100))}%`;
    document.getElementById('comp-bar-c').style.width = `${Math.min(100, Math.round((totC / targets.c) * 100))}%`;
    document.getElementById('comp-bar-p').style.width = `${Math.min(100, Math.round((totP / targets.p) * 100))}%`;
    document.getElementById('comp-bar-g').style.width = `${Math.min(100, Math.round((totG / targets.g) * 100))}%`;

    // Renderizza direttamente in primo piano le 5 Card dei Pasti con il bottone "+ Aggiungi"
    const container = document.getElementById('comp-meals-log-container');
    container.innerHTML = composerMealSlots.map(s => {
        const items = log[s.id] || [];
        const slotKcal = items.reduce((acc, x) => acc + x.kcal, 0);
        const slotC = items.reduce((acc, x) => acc + x.c, 0);
        const slotP = items.reduce((acc, x) => acc + x.p, 0);
        const slotG = items.reduce((acc, x) => acc + x.g, 0);

        const itemsHtml = items.length === 0
            ? `<div class="text-sm text-zinc-400 font-medium py-2 text-center bg-zinc-50/70 rounded-xl border border-dashed border-zinc-200">Nessun alimento inserito</div>`
            : items.map((item, idx) => `
                <div class="flex justify-between items-center bg-zinc-50 px-4 py-3 rounded-xl border border-zinc-200 gap-3">
                    <div class="min-w-0 flex-1">
                        <div class="text-base font-extrabold text-zinc-950 leading-snug">${item.name}</div>
                        <div class="text-xs font-bold text-emerald-700 mt-0.5">${item.kcal} kcal • ${item.c}g C • ${item.p}g P • ${item.g}g G</div>
                    </div>
                    <button type="button" onclick="removeComposerEntry('${s.id}', ${idx})" class="w-10 h-10 rounded-xl bg-white border border-zinc-300 text-zinc-500 hover:text-red-600 flex items-center justify-center shrink-0">
                        <i class="fa-solid fa-trash-can text-sm"></i>
                    </button>
                </div>
            `).join('');

        return `
            <div class="pro-card rounded-3xl p-5 space-y-3.5">
                <div class="flex justify-between items-center">
                    <div class="flex items-center space-x-2.5">
                        <div class="w-9 h-9 rounded-xl bg-zinc-100 text-zinc-900 flex items-center justify-center text-sm">
                            <i class="fa-solid ${s.icon}"></i>
                        </div>
                        <div>
                            <h3 class="text-lg font-black text-zinc-950 leading-none">${s.label}</h3>
                            <span class="text-xs font-bold text-zinc-500 mt-1 block">${slotKcal} kcal • ${slotC}g C • ${slotP}g P • ${slotG}g G</span>
                        </div>
                    </div>
                    <button type="button" onclick="openComposerPicker('${s.id}')" class="h-11 px-4 rounded-xl bg-zinc-950 text-white text-xs font-extrabold flex items-center space-x-1.5 shadow-sm active:scale-95 transition">
                        <i class="fa-solid fa-plus text-emerald-400"></i>
                        <span>Aggiungi</span>
                    </button>
                </div>
                <div class="space-y-2">${itemsHtml}</div>
            </div>
        `;
    }).join('');
}
