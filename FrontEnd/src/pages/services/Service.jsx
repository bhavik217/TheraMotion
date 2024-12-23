import IntroSection from "../../components/IntroSection/IntroSection";
import ServiceBox from "../../components/Servicebox/Servicebox";
import serviceData from "./../data/serviceData";
// import Bookappoint from '../Components/Bookappoint'

function Service() {
    return (
        <div className="servico">
            <IntroSection
                hd1="Experience Our Extensive Services"
                content1="We truly believe in a patient focused care model, by offering a range of services under the one roof and a team approach we want to help you 'Move Through Life'."
                content2="Our aim is to identify your health goals and create a plan to achieve these. This may mean working with just one of our practitioners or utilising other services to help you achieve this. Our team collaborates together and most importantly communicates with you, to get you to your health goals."
                img="Services-imgs\TrainerHelp.jpg"
            />

            <div className="container" style={{ marginTop: "7vh" }}>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 py-5 ab">
                    {serviceData.map((data, index) => {
                        return (
                            <ServiceBox
                                key={data.key}
                                heading={data.heading}
                                image={data.image}
                            />
                        );
                    })}
                </div>
            </div>
            {/* <Bookappoint /> */}
        </div>
    );
}
export default Service;
