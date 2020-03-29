module.exports = (sequelizer, DataTypes) => {

     const monitor = sequelizer.define("monitors", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        hostId:{
            type: DataTypes.INTEGER,
            allowNull: false,
        validate: {
            notEmpty: true,
            notNull: {
                msg: 'É preciso ter um Host associado ao monitor, informe o ID de um host.'
                }
            }
        },
        monitorDate: {
            type: DataTypes.DATE,
            validate:{
                isDate: true
            }
        },
        url: {type: DataTypes.STRING},
        status: {type: DataTypes.STRING},
        statusCod: {type: DataTypes.INTEGER},
        timeResponse:  {type: DataTypes.INTEGER}
    },{
        timestamps: false,
        freezeTableName: true 
      });

    return monitor
}
