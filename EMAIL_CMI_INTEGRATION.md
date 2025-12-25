# Email à envoyer à CMI Integration

**À:** integration.ecom@cmi.co.ma  
**Objet:** Problème d'intégration CMI - Erreur 3D-1004 Code de sécurité erronné

---

Bonjour,

Je vous contacte concernant un problème rencontré lors de l'intégration du système de paiement CMI sur notre plateforme de réservation en ligne.

## Problème rencontré

Lors de la soumission d'un formulaire de paiement vers votre passerelle, nous recevons systématiquement l'erreur suivante :
- **Code d'erreur :** 3D-1004
- **Message :** Code de sécurité erronné

## Informations de configuration

Voici toutes les informations d'identification que nous utilisons :

### Identifiants marchand
- **Client ID :** 600000560
- **Username :** marraskeshts_a
- **Store Type :** 3D_PAY_HOSTING
- **Hash Algorithm :** ver3
- **Currency :** 504 (MAD - Dirham marocain)
- **Clé secrète (Store Key) :** moaa987!@@AET

### URLs de retour
- **URL de succès (okUrl) :** http://localhost:3000/payment/success?bookingRef={bookingReference}
- **URL d'échec (failUrl) :** http://localhost:3000/payment/failed?bookingRef={bookingReference}

*(Note : En production, ces URLs seront remplacées par https://marrakeshtravelservices.com/payment/success et https://marrakeshtravelservices.com/payment/failed)*

## Détails techniques de l'intégration

### Calcul du hash SHA1

Nous calculons le hash selon la formule suivante (Format 1) :
```
hashString = clientid + username + oid + amount + okUrl + failUrl + rnd + storekey
hash = SHA1(hashString).toUpperCase()
```

**Exemple de transaction récente :**
- **OID :** BK0275
- **Amount :** 800.00 MAD (envoyé comme "80000" en centimes dans le formulaire)
- **RND :** (nombre aléatoire généré à chaque transaction)

### Paramètres envoyés dans le formulaire

```javascript
{
  clientid: "600000560",
  username: "marraskeshts_a",
  storetype: "3D_PAY_HOSTING",
  hashAlgorithm: "ver3",
  currency: "504",
  oid: "BK0275",
  amount: "80000", // Montant en centimes
  okUrl: "http://localhost:3000/payment/success?bookingRef=BK0275",
  failUrl: "http://localhost:3000/payment/failed?bookingRef=BK0275",
  rnd: "[random_number]",
  hash: "[calculated_hash]"
}
```

## Questions

1. La clé secrète `moaa987!@@AET` est-elle correcte et complète ?
2. Le format du calcul du hash est-il correct pour votre système ver3 ?
3. Le montant doit-il être envoyé en centimes (80000) ou en format décimal (800.00) ?
4. L'ordre des paramètres dans le calcul du hash est-il correct ?
5. Y a-t-il d'autres paramètres requis que nous n'envoyons pas ?

## Informations supplémentaires

- **Environnement :** Développement (localhost)
- **Technologie backend :** Node.js avec Express
- **Technologie frontend :** Next.js (React)
- **Méthode de soumission :** Formulaire HTML POST vers https://payment.cmi.co.ma/fim/est3Dgate

## Logs de débogage

Nous avons activé des logs détaillés qui montrent :
- La chaîne complète utilisée pour le calcul du hash (sans exposer la clé secrète)
- Tous les paramètres envoyés dans le formulaire
- Le hash calculé

## Demande d'assistance

Pourriez-vous :
1. Vérifier si nos identifiants sont corrects et actifs ?
2. Confirmer la clé secrète que nous devons utiliser ?
3. Nous fournir un exemple de calcul de hash correct pour notre configuration ?
4. Nous indiquer si notre format de montant et l'ordre des paramètres sont corrects ?

Je reste à votre disposition pour fournir toute information supplémentaire ou pour effectuer des tests selon vos instructions.

En vous remerciant par avance pour votre assistance.

Cordialement,

[Votre nom]  
[Votre fonction]  
[Nom de l'entreprise]  
[Email de contact]  
[Téléphone]

---

**Pièces jointes (si nécessaire) :**
- Captures d'écran de l'erreur
- Logs de débogage détaillés
- Exemple de requête complète

