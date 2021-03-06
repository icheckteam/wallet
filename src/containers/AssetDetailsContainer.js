import React, { Component } from 'react';
import { connect } from 'react-redux';
import AssetDetails from './assets/AssetDetails';
import { showUnlockDialogIfNotPassword } from '../actions/unlockDialog';
import { 
  queryHistoryUpdate, 
  addMaterials, 
  queryAccountAssets, 
  createReporter, 
  revokeReporter, 
  getAsset, 
  subtractQuantity, 
  addQuantity,
  createAsset
} from '../actions/assets'
function mapStateToProps(state) {
  return {
    auth: state.auth,
    asset: state.asset.asset,
    history: state.history.history,
  };
}

class AssetDetailsContainer extends Component {

  componentDidMount() {
    this.props.getAsset(this.props.match.params.id)
  }

  onAddMaterial = (materials) =>  {
    this.props.showUnlockDialogIfNotPassword(this.props.auth.config, () => {
      this.props.addMaterials(this.props.match.params.id, {
        ...this.props.auth.config,
        materials: materials,
      })
    });
  }

  onCreateReporter = (data) =>  {
    this.props.showUnlockDialogIfNotPassword(this.props.auth.config, () => {
      this.props.createReporter(this.props.match.params.id, {
        ...this.props.auth.config,
        ...data,
      })
    });
  }

  onRevokeReporter = (reporter) =>  {
    this.props.showUnlockDialogIfNotPassword(this.props.auth.config, () => {
      this.props.revokeReporter(this.props.match.params.id, reporter, {
        ...this.props.auth.config,
      })
    });
  }

  onAddQuantity = (quantity) =>  {
    this.props.showUnlockDialogIfNotPassword(this.props.auth.config, () => {
      this.props.addQuantity(this.props.match.params.id, {
        ...this.props.auth.config,
        quantity,
      })
    });
  }

  onSubtractQuantity = (quantity) =>  {
    this.props.showUnlockDialogIfNotPassword(this.props.auth.config, () => {
      this.props.subtractQuantity(this.props.match.params.id, {
        ...this.props.auth.config,
        quantity,
      })
    });
  }

  onNewAsset = (data) =>  {
    this.props.showUnlockDialogIfNotPassword(this.props.auth.config, () => {
      this.props.createAsset({
        ...this.props.auth.config,
        asset: {
          ...data,
          parent: this.props.asset.id,
        }
      })
    });
  }

  render() {
    const { asset} = this.props;

    // update asset
    if (asset && asset.id !== this.props.match.params.id) {
      this.props.getAsset(this.props.match.params.id)
    }

    return (
      <div>
        {asset ? (
          <div>
            <AssetDetails 
              onNewAsset={this.onNewAsset}
              onSubtractQuantity={this.onSubtractQuantity}
              onAddQuantity={this.onAddQuantity}
              onAddReporter={this.onCreateReporter}
              onRevokeReporter={this.onRevokeReporter}
              onAddMaterial={this.onAddMaterial}
              history={this.props.history}
              asset={asset}
            />
          </div>
        ): "Asset not found"}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  {
    queryHistoryUpdate, 
    queryAccountAssets, 
    addMaterials, 
    createReporter, 
    revokeReporter, 
    getAsset, 
    showUnlockDialogIfNotPassword,
    subtractQuantity,
    addQuantity,
    createAsset,
  },
)(AssetDetailsContainer);