import ExploreBuddyForm from "@/components/Forms/ExploreBuddyForm";
import ExploreBuddyInput from "@/components/Forms/ExploreBuddyInput";
import ExploreBuddyOptionalModal from "@/components/Shared/ExploreBuddyModal/ExploreBuddyOptionalModal";
import {
  useGetMyOwnProfileQuery,
  useUpdateMyProfileMutation,
} from "@/redux/api/myProfile";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type IProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
};

const ProfileUpdateModal = ({ open, setOpen, id }: IProps) => {
  const { data } = useGetMyOwnProfileQuery("");
  const [updateMyProfile, { isLoading }] = useUpdateMyProfileMutation();
  const handleSubmit = async (values: FieldValues) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(values));
    try {
      const res = await updateMyProfile(formData).unwrap();
      setOpen(false);
      if (res.id) {
        toast.success("Profile Information Updated Successfully");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <ExploreBuddyOptionalModal
      open={open}
      setOpen={setOpen}
      title="Update Profile"
    >
      <ExploreBuddyForm onSubmit={handleSubmit} defaultValues={data}>
        <ExploreBuddyInput
          name="name"
          label="Name"
          required
          sx={{
            marginTop: 2,
            marginBottom: 4,
            marginRight: 2,
          }}
        />
        <ExploreBuddyInput
          name="email"
          label="Email"
          required
          sx={{
            marginTop: 2,
            marginBottom: 4,
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 2,
          }}
        >
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </ExploreBuddyForm>
    </ExploreBuddyOptionalModal>
  );
};

export default ProfileUpdateModal;
