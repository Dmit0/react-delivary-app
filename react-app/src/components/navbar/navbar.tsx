import React, { useCallback } from 'react';
import '../../css/header.css';
import { Link } from 'react-router-dom';
import { geoAPI } from '../../api/part_apis/geoApi';
import { meals } from '../../interfaces/meals';
import { set_current_country } from '../../redux/actions/countriesActions';
import { setCities, setRegions } from '../../redux/actions/geoAction';
import { RootState } from '../../redux/reducers/rootReducer';
import { PopupContainer } from '../authentication/PopupContainer';
import { LoginPopup } from '../authentication/loginPopup';
import { RegistrationPopup } from '../authentication/registrationPopup';
import { addressDataStep, userForCreateAccount } from '../../interfaces/authentication';
import { useDispatch, useSelector } from 'react-redux';
import { authClose, create_account, logIn, setStepCancel, setStepContinue, updateAddress, verifyMail } from '../../redux/actions/authentication';

interface NavBarProps {
  cart_length: meals[]
}

export const NavBar: React.FC<NavBarProps> = ({ cart_length }) => {

  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [popuBody, setPopupBody] = React.useState<any>(null);//найти тип для html el
  const [isLogin, setisLogin] = React.useState<boolean>(true);

  const { token, userName } = useSelector((state: RootState) => {
    return {
      token: state.authentication.token,
      userName:state.authentication.userName
    };
  });

  const dispatch = useDispatch();
  const handleAuthOpen = () => {
    setIsPopupOpen(true);
    setisLogin(true);
    setPopupBody(
      <LoginPopup
        registrationHeandler={registrationHeandler}
        verifyMail = {(mail:string)=>dispatch(verifyMail(mail))}
        logIn={(data)=>dispatch(logIn(data))}
      />);
  };
  const { selectCountries, countries } = useSelector((state: RootState) => {
    return {
      selectCountries: state.countries.countries.map((country) => {
        return { value: country.name, label: country.name };
      }),
      countries:state.countries.countries,
    };
  });

  const fetchRegions = async (code: any) => {
    const regions = await geoAPI.fetchRegions(code)
    if (regions) {
      dispatch(setRegions(regions.data))
    }
  }

  const onAddFirstAddress = async (data: addressDataStep) => {
    dispatch(updateAddress(data))
  }

  // const fetchCities = async (region: string, countryCode: string, regions: any) => {
  //   const myRegion = regions.length > 0 && regions.find((Region: any)=> Region.name === region)
  //   if(myRegion) {
  //     const country = await geoAPI.fetchCountry(countryCode)
  //     if(country) {
  //        myRegion && await setTimeout( async () => {
  //         const cities = await geoAPI.fetchCities(myRegion.isoCode, country.data.wikiDataId)
  //          cities && dispatch(setCities(cities.data))
  //       }, 1500)
  //     }
  //   }
  // }

  const handleClose = () => {
    setIsPopupOpen(false);
    dispatch(authClose())
  };

  //TO DO remove logic to another place
  const createAccount = (user: userForCreateAccount) => {
    dispatch(create_account(user));
  };
  const registrationHeandler = () => {
    setIsPopupOpen(true);
    setisLogin(false);
    dispatch(authClose())
    setPopupBody(
      <RegistrationPopup
      handleAuthOpen={handleAuthOpen}
      createAccount={createAccount}
      countries={selectCountries}
      onSelectCountry={handleSelectCountry}
      authStepStop={handleAuthStepStop}
      authStepContinue = {handleAuthStepContinue}
      onClose={handleClose}
      fetchRegions={fetchRegions}
      //fetchCities={fetchCities}
      onAddFirstAddress={onAddFirstAddress}
    />);
  };

  const handleSelectCountry = async (value: string, needToFetch: boolean) => {
    const country = countries.find((country) => country.name === value);
    if (country) {
      dispatch(set_current_country(country));
      if (needToFetch) {
        const regions = await geoAPI.fetchRegions(country.code);
        if (regions) {
          dispatch(setRegions(regions.data));
        }
      }
    }
  };

  const handleAuthStepStop = () => {
    dispatch(setStepCancel())
    setIsPopupOpen(false);
    dispatch(authClose())
  }

  const handleAuthStepContinue = () => {
    dispatch(setStepContinue())
  }

  const userPageRedirect = () => {

  }


  const count = (): Number => {
    let num = cart_length.reduce((sum, current) => (
      sum + current.count
    ), 0);

    return num;
  };
  return (
    <>
      <PopupContainer isOpen={isPopupOpen} onClose={handleClose} isLogin={isLogin}>{popuBody}</PopupContainer>
      <div className="App__header ">
        <div className="App_header__main">
          <nav className="navbar navbar-light">
            <div className="container-fluid App_header__main-container ">
              <Link to={`/HomePage`}>
                      <span className="navbar-brand  App_header__main-Header">
                          <img src="assets/leaf.svg" width="30" height="30" alt="" loading="lazy"/>
                          Delivary
                      </span>
              </Link>
              <span className="Partnership">Partnership</span>
              <div className="button-controller">
                <button type="button" onClick={ token ? userPageRedirect : handleAuthOpen } className="btn btn-outline-info App_header__main-button">{token ? userName : 'LogIn'}</button>
                <Link to={'/cart'}>
                  <button type="button" className="btn btn-warning App_header__secondary-button">
                    Cart
                    <span className="App_header__secondary-cart">
                          {count()}
                          </span>
                  </button>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};
