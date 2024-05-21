export default async callback => {
	callback(await User.find({}))
}