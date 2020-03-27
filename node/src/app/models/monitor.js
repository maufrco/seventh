module.exports = (sequelizer, DataTypes) => {

     const monitor = sequelizer.define("monitors", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        hostId:{type: DataTypes.INTEGER},
        monitorDate: {type: DataTypes.DATE},
        url: {type: DataTypes.STRING},
        status: {type: DataTypes.STRING},
        statusCod: {type: DataTypes.INTEGER},
        timeResponse:  {type: DataTypes.INTEGER}
    },{
        timestamps: false,
        freezeTableName: true 
      });
    
    //   monitor.associate = function (models) {  
    //     monitor.belongsTo(models.host, {  
    //       foreignKey: 'hostId',  
    //       sourceKey: 'id'  
    //     });  
    //   };

    return monitor
}
