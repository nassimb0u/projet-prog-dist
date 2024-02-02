import streamlit as st
import requests

def main():
    st.title("Predict Housing Prices")

    # Sidebar
    st.sidebar.header("User Input")

    # Define input fields
    crim = st.sidebar.text_input("CRIM")
    zn = st.sidebar.text_input("ZN")
    indus = st.sidebar.text_input("INDUS")
    chas = st.sidebar.text_input("CHAS")
    nox = st.sidebar.text_input("NOX")
    rm = st.sidebar.text_input("RM")
    age = st.sidebar.text_input("AGE")
    dis = st.sidebar.text_input("DIS")
    rad = st.sidebar.text_input("RAD")
    tax = st.sidebar.text_input("TAX")
    ptratio = st.sidebar.text_input("PTRATIO")
    b = st.sidebar.text_input("B")
    lstat = st.sidebar.text_input("LSTAT")

    save_data = st.sidebar.checkbox("Enregistrer les données")

    # Button to trigger prediction and data submission
    if st.sidebar.button("Prédire"):
        result = send_data_and_get_result(crim, zn, indus, chas, nox, rm, age, dis, rad, tax, ptratio, b, lstat, save_data)

        if "error" in result:
        
           
            st.error(f"Erreur : {result['error']}")
        else:
            message = result.get("result")
            st.success(f"Prix prédit : {message}")

    # Recent Properties Section
    st.header("Recent Property Listed")
    show_recent_properties()


def send_data_and_get_result(crim, zn, indus, chas, nox, rm, age, dis, rad, tax, ptratio, b, lstat, save_data):
    # ... (rest of the code)
    ml_service_url = "http://ml-service:8000/predict-price"

    try:
        # Convert input data to appropriate types
        input_data = {
            "CRIM": float(crim),
            "ZN": float(zn),
            "INDUS": float(indus),
            "CHAS": int(chas),  # Convert to integer for 'CHAS'
            "NOX": float(nox),
            "RM": float(rm),
            "AGE": float(age),
            "DIS": float(dis),
            "RAD": int(rad),  # Convert to integer for 'RAD'
            "TAX": float(tax),
            "PTRATIO": float(ptratio),
            "B": float(b),
            "LSTAT": float(lstat),
            "save": bool(save_data),  # Use 'save' instead of 'save_data'
        }
        # Validate input data range (if necessary)
        # Add your validation logic here if needed

        response = requests.post(ml_service_url, json=input_data)
        response.raise_for_status()
        result = response.json()["MEDV"]
        print(response)

        return {"success":"success","result":result}

    except ValueError:
        return {"error": "Veuillez entrer des nombres valides."}

    except requests.exceptions.RequestException as e:
        return {"error": f"Erreur de communication avec le service ML : {e}"}

import streamlit as st

def show_recent_properties():
    # Exemple de données pour tester l'affichage
  
    example_data  = fetch_data_streamlit()

    # Display recent properties using cards with three cards per row
    if example_data:
        cards_per_row = 3
        num_properties = len(example_data)
        num_rows = (num_properties + cards_per_row - 1) // cards_per_row

        for row in range(num_rows):
            st.write("<div style='display: flex;'>", unsafe_allow_html=True)

            start_index = row * cards_per_row
            end_index = min((row + 1) * cards_per_row, num_properties)

            for i in range(start_index, end_index):
                property_info = example_data[i]
                property_id = property_info.get('_id')

                if property_id is not None:
                    st.write(
                        f"<div style='flex: 1; margin: 10px;'>"
                        f"<h3>House ID: {property_id}</h3>"
                        f"<p>Price: <span style='color: green;'>{property_info.get('MEDV')}</span></p>"
                        f"<p>CRIM: {property_info.get('CRIM')}</p>"
                        f"<p>AGE: {property_info.get('AGE')}</p>"
                        f"<hr>"
                        f"</div>",
                        unsafe_allow_html=True
                    )
                else:
                    st.warning("La clé 'id' est manquante pour une propriété.")

            st.write("</div>", unsafe_allow_html=True)
    else:
        st.warning("Aucune propriété récente trouvée.")


def fetch_data_streamlit():
    db_service_url = "http://db-service:8080/houses"

    try:
        response = requests.get(db_service_url)
        response.raise_for_status()
        data = response.json()
        return data
    except requests.exceptions.RequestException as e:
        st.error(f"Erreur lors de la récupération des données depuis le service de base de données : {e}")
        return []
if __name__ == "__main__":
    main()
