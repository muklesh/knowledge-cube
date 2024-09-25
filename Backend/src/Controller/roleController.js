import { StatusCodes } from "http-status-codes";
import Role from "../Model/roleModel.js";

export const createRole = async (req, res) => {
  try {
    const { roleName } = req.body;

    if (!roleName) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, message: "role name not found" });
    }
    const role = new Role({ roleName });
    const roleData = await role.save();

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Role created successfully",
      data: roleData,
    });
  } catch (error) {
    console.log("error :>> ", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: error.message });
  }
};

export const getAllRole = async (req, res) => {
  try {
    const role = await Role.find({});
    if (!role) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, message: "Role not found!" });
    }
    return res
      .status(StatusCodes.OK)
      .json({ success: true, message: "", data: role });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: true,
      error: error.message,
    });
  }
};

export const getRoleById = async (req, res) => {
  try {
    const role = await RoleModel.findById(req.params.id);
    if (!role) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: true, message: "Role not found" });
    }
    return res
      .status(StatusCodes.OK)
      .json({ success: true, message: "Role fetched successfully", role });
  } catch (error) {
    console.log("error :>> ", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: error.message });
  }
};
