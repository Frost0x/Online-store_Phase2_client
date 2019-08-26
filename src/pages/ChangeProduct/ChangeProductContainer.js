import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose, withProps, lifecycle } from 'recompose'
import { withRouter } from 'react-router-dom'

import { logout } from '../../ducks/authorization'
import { reloadCardData } from '../../ducks/productCard'

import ChangeProduct from './ChangeProduct'

const mapStateToProps = state => ({
    authorized: state.authorization.authorized,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    logout,
    reloadCardData,
}, dispatch)

const props = ({
    match,
    logout,
    authorized,
    reloadCardData,
}) => ({
    match,
    authorized,
    reloadCardData,
    logout: () => {
        logout()
    }
})

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),
    withProps(props),
    withRouter,
    lifecycle({
        UNSAFE_componentWillMount() {
            this.props.reloadCardData()
        }
    })
)(ChangeProduct)