module.exports = (sequelize, DataTypes) => {
	const appUser = sequelize.define(
		'appUser',
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			instagram_id: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			phone_number: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			created_date_time: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
				allowNull: false,
			},
			modified_date_time: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
				allowNull: false,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			/**
			 * By default, sequelize will automatically transform all passed model names into plural
			 * References: https://sequelize.org/master/manual/model-basics.html#table-name-inference
			 */
			tableName: 'appUser',
		},
	);

	// user.associate = (models) => {
	// 	user.belongsTo(models.role, {
	// 		foreignKey: 'role_id',
	// 		onDelete: 'CASCADE',
	// 	});
	// };

	return appUser;
};
