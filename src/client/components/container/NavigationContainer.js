
import { connect } from 'react-redux';
import Navigation from "../pure/Navigation";
import * as userActions from "../../actions/users";

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

export default connect(
    mapStateToProps,
    userActions)
(Navigation);
