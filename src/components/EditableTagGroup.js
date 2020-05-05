import React from "react";
import { Tag, Input, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export default class EditableTagGroup extends React.Component {
    state = {
        tags: [],
        inputVisible: false,
        inputValue: "",
        editInputIndex: -1,
        editInputValue: "",
    };

    constructor(props) {
        super(props);
        
        this.state.tags = props.initialValues || [];
        this.onChangeCallback = tags => {
            if (props.onChange) props.onChange(tags);
        };
    }

    handleClose = removedTag => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        this.onChangeCallback(tags);
        this.setState({ tags });
    };

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    };

    handleInputChange = e => {
        this.setState({ inputValue: e.target.value });
    };

    handleInputConfirm = () => {
        const { inputValue } = this.state;
        let { tags } = this.state;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }

        this.onChangeCallback(tags);

        this.setState({
            tags,
            inputVisible: false,
            inputValue: "",
        });
    };

    handleEditInputChange = e => {
        this.setState({ editInputValue: e.target.value });
    };

    handleEditInputConfirm = () => {
        this.setState(({ tags, editInputIndex, editInputValue }) => {
            const newTags = [...tags];
            newTags[editInputIndex] = editInputValue;

            this.onChangeCallback(newTags);

            return {
                tags: newTags,
                editInputIndex: -1,
                editInputValue: "",
            };
        });
    };

    saveInputRef = input => (this.input = input);

    saveEditInputRef = input => (this.editInput = input);

    render() {
        const {
            tags,
            inputVisible,
            inputValue,
            editInputIndex,
            editInputValue,
        } = this.state;
        return (
            <div>
                {tags.map((tag, index) => {
                    if (editInputIndex === index) {
                        return (
                            <Input
                                ref={this.saveEditInputRef}
                                key={tag}
                                size="small"
                                className="tag-input"
                                value={editInputValue}
                                onChange={this.handleEditInputChange}
                                onBlur={this.handleEditInputConfirm}
                                onPressEnter={this.handleEditInputConfirm}
                            />
                        );
                    }

                    const isLongTag = tag.length > 20;

                    const tagElem = (
                        <Tag
                            className="edit-tag"
                            key={tag}
                            closable={true}
                            onClose={() => this.handleClose(tag)}>
                            <span
                                onDoubleClick={e => {
                                    this.setState(
                                        {
                                            editInputIndex: index,
                                            editInputValue: tag,
                                        },
                                        () => {
                                            this.editInput.focus();
                                        }
                                    );
                                    e.preventDefault();
                                }}>
                                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                            </span>
                        </Tag>
                    );
                    return isLongTag ? (
                        <Tooltip title={tag} key={tag}>
                            {tagElem}
                        </Tooltip>
                    ) : (
                        tagElem
                    );
                })}
                {inputVisible && (
                    <Input
                        ref={this.saveInputRef}
                        type="text"
                        size="small"
                        className="tag-input"
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                    />
                )}
                {!inputVisible && (
                    <Tag className="site-tag-plus" onClick={this.showInput}>
                        <PlusOutlined /> New Key
                    </Tag>
                )}
            </div>
        );
    }
}
