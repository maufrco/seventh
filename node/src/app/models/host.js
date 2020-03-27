module.exports = (sequelizer, DataTypes) => {

    const host = sequelizer.define("hosts", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name: DataTypes.STRING,
        protocol:{type:DataTypes.ENUM,values: ['http://', 'https://']},
        domain:DataTypes.STRING,
        path: DataTypes.STRING
    },{
        timestamps: false,
        freezeTableName: true 
      });
    //   host.associate = function (models) { host.belongsTo(models.monitor, {  
    //     foreignKey: 'hostId',  
    //     targetKey: 'id'  
    //     });  
    //   };
      
    return host;
}