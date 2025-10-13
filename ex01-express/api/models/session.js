const getSessionModel = (sequelize, { DataTypes }) =>{
    const Session = sequelize.define("session",{
        jwttoken : {
                type: DataTypes.STRING,
                allowNull: false, 
                validate: {
                notEmpty: true,
            },
        },
    },
    {
        timestamps: true,
    })
 
    Session.associate = (models) => {
        Session.belongsTo(models.User, { foreignKey : 'userId' ,onDelete: "CASCADE" });
    }   

    return Session;
} 

export default getSessionModel;