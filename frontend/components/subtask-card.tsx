import React from "react";
import { Button, ButtonIcon } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "./ui/form-control";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField } from "./ui/input";
import { Textarea, TextareaInput } from "./ui/textarea";
import { TrashIcon } from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";

type SubtaskEditCardProps = {
  title: string;
  description: string | undefined;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  handleDelete: () => void;
};

const SubtaskEditCard = ({
  title,
  description,
  setTitle,
  setDescription,
  handleDelete,
}: SubtaskEditCardProps) => {
  return (
    <Card>
      <HStack space="md">
        <Button
          onPress={() => {
            handleDelete();
          }}
          variant="link"
        >
          <ButtonIcon size="md" as={TrashIcon} />
        </Button>
        <VStack space="md" className="flex-1">
          <FormControl isRequired>
            <FormControlLabel>
              <FormControlLabelText>Title</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="text"
                value={title}
                onChangeText={(text) => setTitle(text)}
                placeholder="Do some work"
              />
            </Input>
          </FormControl>
          <FormControl>
            <FormControlLabel>
              <FormControlLabelText>Description</FormControlLabelText>
            </FormControlLabel>
            <Textarea>
              <TextareaInput
                value={description || ""}
                onChangeText={(text) => setDescription(text)}
                placeholder="Get xyz done..."
              />
            </Textarea>
          </FormControl>
        </VStack>
      </HStack>
    </Card>
  );
};

export default SubtaskEditCard;
