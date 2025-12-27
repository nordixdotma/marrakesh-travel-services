# Email à envoyer à CMI Integration

**À:** integration.ecom@cmi.co.ma  
**Objet:** Demande de documentation d'intégration et identifiants de test CMI

---

Bonjour,

Je vous contacte dans le cadre de l'intégration du système de paiement CMI sur notre plateforme de réservation en ligne "Marrakesh Travel Services".

**CONTEXTE**

Nous sommes en train d'intégrer la passerelle de paiement CMI pour permettre à nos clients de payer leurs réservations en ligne par carte bancaire. Nous avons rencontré quelques difficultés lors de l'implémentation et nous aurions besoin de votre assistance.

**DEMANDES**

Pourriez-vous nous fournir :

1. **Documentation technique complète d'intégration CMI**
   - Guide d'intégration détaillé pour l'algorithme ver3
   - Exemples de code pour le calcul du hash SHA512
   - Format exact des paramètres requis
   - Ordre des paramètres dans le calcul du hash
   - Format du montant (décimal ou centimes)
   - Liste complète des paramètres obligatoires et optionnels

2. **Identifiants de test (Sandbox/Test)**
   - Client ID de test
   - Username de test
   - Store Key de test
   - URL de la passerelle de test (si différente de la production)
   - Toute autre information nécessaire pour les tests

3. **Exemple de transaction de test**
   - Un exemple complet avec tous les paramètres
   - Le hash calculé pour cet exemple
   - Les valeurs exactes à utiliser pour tester

**INFORMATIONS SUR NOTRE PROJET**

- **Nom de l'entreprise :** Marrakesh Travel Services
- **Site web :** https://marrakeshtravelservices.com
- **Type de commerce :** Services de voyage et réservations touristiques
- **Environnement actuel :** Développement/Test
- **Technologie :** Node.js (backend) et Next.js (frontend)

**PROBLÈMES RENCONTRÉS**

Lors de nos tests, nous rencontrons l'erreur suivante :
- **Code d'erreur :** 3D-1004
- **Message :** Code de sécurité erronné

Nous avons implémenté le calcul du hash selon la documentation que nous avons trouvée, mais il semble qu'il y ait une différence avec ce que votre système attend.

**INFORMATIONS ACTUELLES**

Nous utilisons actuellement les identifiants suivants (si vous pouvez confirmer s'ils sont corrects) :
- **Client ID :** 600000560
- **Username :** marraskeshts_a
- **Store Type :** 3D_PAY_HOSTING
- **Hash Algorithm :** ver3
- **Currency :** 504 (MAD)

**BESOIN URGENT**

Nous souhaiterions finaliser l'intégration dans les plus brefs délais pour pouvoir lancer notre plateforme. Toute assistance de votre part serait grandement appréciée.

Je reste à votre disposition pour fournir toute information supplémentaire ou pour organiser un appel si nécessaire.

En vous remerciant par avance pour votre assistance.

Cordialement,

[Votre nom]  
[Votre fonction]  
Marrakesh Travel Services  
[Email de contact]  
[Téléphone]  
[Site web : https://marrakeshtravelservices.com]

---

**Pièces jointes (si nécessaire) :**
- Captures d'écran de l'erreur
- Logs de débogage de notre implémentation actuelle


