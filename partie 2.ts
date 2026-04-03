
# =================================================================
# PARTIE 1 : CHARGEMENT ET EXPLORATION INITIALE
# =================================================================
print("--- PARTIE 1 : EXPLORATION ---")
df = pd.read_csv('sales_data.csv')

print("\n5 premières lignes :")
print(df.head()) # [11]

print("\nTypes de données :")
print(df.dtypes) # [11]

print("\nStatistiques descriptives :")
print(df.describe()) # [11]

print(f"\nDimensions du dataset : {df.shape}") # [11]
print(f"Valeurs manquantes :\n{df.isnull().sum()}") # [11]
print(f"Doublons détectés : {df.duplicated().sum()}") # [11]

# =================================================================
# PARTIE 2 : NETTOYAGE DES DONNÉES
# =================================================================
print("\n--- PARTIE 2 : NETTOYAGE ---")
nb_initial = len(df)

# Correction des types
df['Date'] = pd.to_datetime(df['Date']) # [11]
df['Quantité'] = pd.to_numeric(df['Quantité'], errors='coerce')
df['Prix_Unitaire'] = pd.to_numeric(df['Prix_Unitaire'], errors='coerce')

# Traitement des valeurs manquantes et doublons
df = df.dropna() # [11]
df = df.drop_duplicates() # [11]

# Nouvelle colonne Chiffre_Affaires
df['Chiffre_Affaires'] = df['Quantité'] * df['Prix_Unitaire'] # [11]

print(f"Impact du nettoyage : {nb_initial - len(df)} lignes supprimées.") # [12]

# =================================================================
# PARTIE 3 : ANALYSE DESCRIPTIVE
# =================================================================
print("\n--- PARTIE 3 : ANALYSE DESCRIPTIVE ---")

ca_total = df['Chiffre_Affaires'].sum()
vente_moyenne = df['Chiffre_Affaires'].mean()
produit_top = df.groupby('Produit')['Quantité'].sum().idxmax()
cat_rentable = df.groupby('Catégorie')['Chiffre_Affaires'].sum().idxmax()

print(f"Chiffre d'Affaires Total : {ca_total:.2f} €") # [12]
print(f"Vente moyenne : {vente_moyenne:.2f} €") # [12]
print(f"Produit le plus vendu : {produit_top}") # [12]
print(f"Catégorie la plus rentable : {cat_rentable}") # [12]

# Ventes par ville
ventes_ville = df.groupby('Ville')['Chiffre_Affaires'].sum().sort_values(ascending=False)
print("\nRevenus par ville :")
print(ventes_ville) # [12]

# =================================================================
# PARTIE 4 : VISUALISATION DES DONNÉES
# =================================================================
print("\n--- PARTIE 4 : VISUALISATION (Fenêtres graphiques en cours...) ---")
plt.style.use('seaborn-v0_8')

# 1. Histogramme des ventes
plt.figure(figsize=(10, 6))
sns.histplot(df['Chiffre_Affaires'], bins=20, kde=True, color='skyblue')
plt.title('Distribution du Chiffre d\'Affaires par Transaction')
plt.show() # [12]

# 2. Courbe d'évolution temporelle (Mensuelle)
plt.figure(figsize=(10, 6))
df.set_index('Date').resample('M')['Chiffre_Affaires'].sum().plot(marker='o', color='green')
plt.title('Évolution Mensuelle du Chiffre d\'Affaires (2024)')
plt.ylabel('CA Total (€)')
plt.show() # [12]

# 3. Diagramme circulaire des catégories
plt.figure(figsize=(8, 8))
df.groupby('Catégorie')['Chiffre_Affaires'].sum().plot(kind='pie', autopct='%1.1f%%', startangle=140)
plt.title('Répartition du CA par Catégorie')
plt.ylabel('')
plt.show() # [13]

# 4. Boxplot pour détecter les valeurs aberrantes
plt.figure(figsize=(10, 6))
sns.boxplot(x='Catégorie', y='Chiffre_Affaires', data=df)
plt.title('Détection des Outliers par Catégorie')
plt.show() # [13]

# =================================================================
# PARTIE 5 : ANALYSE AVANCÉE (Optionnelle)
# =================================================================
print("\n--- PARTIE 5 : ANALYSE AVANCÉE ---")

# Corrélation
correlation = df[['Quantité', 'Prix_Unitaire', 'Chiffre_Affaires']].corr()
print("\nMatrice de Corrélation :")
print(correlation) # [13]

# Clients les plus fidèles
clients_fideles = df['Client_ID'].value_counts().head(5)
print("\nTop 5 des clients (Fidélité) :")
print(clients_fideles) # [13]