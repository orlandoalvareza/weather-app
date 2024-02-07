import useScreenSizeListener from "../../hooks/useScreenSizeListener";
import PhoneAditionalInfo from "./PhoneAditionalInfo";
import MiniTabletAditionalInfo from "./MiniTabletAditionalInfo";
import TabletAditionalInfo from "./TabletAditionalInfo";
import LaptopAditionalInfo from "./LaptopAditionalInfo";
import DesktopAditionalInfo from "./DesktopAditionalInfo";

import './AditionalInfoSection.css';

const AditionalInfoSection = () => {
  const isPhone = useScreenSizeListener({ minWidth: 0, maxWidth: 480 });
  const isMiniTablet = useScreenSizeListener({ minWidth: 481, maxWidth: 767 });
  const isTablet = useScreenSizeListener({ minWidth: 768, maxWidth: 1023 });
  const isLaptop = useScreenSizeListener({ minWidth: 1024, maxWidth: 1279 });
  const isDesktop = useScreenSizeListener({ minWidth: 1280, maxWidth: undefined });

  return (
    <section className="App__section">
      {isPhone && <PhoneAditionalInfo/>}
      {isMiniTablet && <MiniTabletAditionalInfo/>}
      {isTablet && <TabletAditionalInfo/>}
      {isLaptop && <LaptopAditionalInfo/>}
      {isDesktop && <DesktopAditionalInfo/>}
    </section>
  )
}

export default AditionalInfoSection;