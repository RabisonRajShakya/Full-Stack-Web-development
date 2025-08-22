// import React from "react";
import axios from "axios";
import {
    FormProvider,
    useFieldArray,
    useForm,
    useFormContext,
} from "react-hook-form";

export interface QuestionSetForm {
    title: string;
    questions: {
        questionText: string;
        choices: { text: string; label: string; correctAnswer: boolean }[];
    }[];
}

function CreateQuestionSetForm() {
    const defaultValues: QuestionSetForm = {
        title: "",
        questions: [
            {
                questionText: "",
                choices: [],
            },
        ],
    };

    const methods = useForm({ defaultValues });
    const { watch, register, handleSubmit } = methods;
    console.log("form values => ", watch());
    const onSubmitHandler = (data: QuestionSetForm) => {
        axios
            .post("http://localhost:3000/api/admin/questionset/create", data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            })
            .then((response) => {
                console.log("Question set created successfully:", response.data);
            })
            .catch((error) => {
                console.error("Error creating question set:", error);
            });
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-800 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 ">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
                            Create Question Set
                        </h1>
                        <p className="text-gray-600 text-center">
                            Build your custom question set with multiple choice answers
                        </p>
                    </div>

                    <FormProvider {...methods}>
                        <form className="space-y-6" onSubmit={handleSubmit(onSubmitHandler)}>
                            <div className="space-y-8">
                                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Enter Title
                                    </label>
                                    <input
                                        {...register("title")}
                                        placeholder="Enter Title"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-800 placeholder-gray-400"
                                    />
                                </div>

                                <CreateQuestions />
                                <button type="submit" className="bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-800 text-1xl text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">Create QuestionSet</button>
                                {/* <button type="submit" className="bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-800 text-1xl text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 my-5">Remove QuestionSet</button> */}
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </div>
        </div>
    );
}

function CreateQuestions() {
    const { register, control } = useFormContext<QuestionSetForm>();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "questions",
    });

    const AddQuestionHandler = () => {
        append({
            choices: [],
            questionText: "",
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Questions</h2>
                <button
                    type="button"
                    onClick={AddQuestionHandler}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Add Questions
                </button>
            </div>

            <div className="space-y-6">
                {fields?.map((field, index) => {
                    const RemoveQuestionHandler = () => {
                        remove(index);
                    };
                    return (
                        <div
                            key={index}
                            className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-700">
                                    Question {index + 1}
                                </h3>
                                {fields.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={RemoveQuestionHandler}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                            />
                                        </svg>
                                        Remove
                                    </button>
                                )}
                            </div>

                            <div className="mb-6">
                                <input
                                    {...register(`questions.${index}.questionText`)}
                                    placeholder="Enter Questions"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-800 placeholder-gray-400"
                                />
                            </div>

                            <CreateChoices questionIndex={index} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function CreateChoices({ questionIndex }: { questionIndex: number }) {
    const { register, control } = useFormContext<QuestionSetForm>();

    const { fields, append, remove } = useFieldArray({
        control,
        name: `questions.${questionIndex}.choices`,
    });

    const AddChoicesHandler = () => {
        append({
            label: String(fields?.length),
            text: "",
            correctAnswer: false,
        });
    };
    return (
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-md font-semibold text-gray-700">Answer Choices</h4>
                <button
                    type="button"
                    onClick={AddChoicesHandler}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2 text-sm"
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Add Choices
                </button>
            </div>

            <div className="space-y-3">
                {fields?.map((field, index) => {
                    const RemoveChoiceHandler = () => {
                        remove(index);
                    };
                    return (
                        <div
                            key={index}
                            className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-200"
                        >
                            <input
                                {...register(
                                    `questions.${questionIndex}.choices.${index}.correctAnswer`
                                )}
                                type="checkbox"
                                className="flex-1 px-3 py-2 border border-gray-200 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all duration-200 text-gray-800 placeholder-gray-400"
                            />
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-600 font-semibold text-sm">
                                    {String.fromCharCode(65 + index)}
                                </span>
                            </div>
                            <input
                                {...register(`questions.${questionIndex}.choices.${index}.text`)}
                                placeholder="Enter Choice"
                                className="flex-1 px-3 py-2 border border-gray-200 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all duration-200 text-gray-800 placeholder-gray-400"
                            />
                            <button
                                type="button"
                                onClick={RemoveChoiceHandler}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md font-medium shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-1 text-sm"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Remove Choice
                            </button>
                        </div>
                    );
                })}
            </div>

            {fields.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    <svg
                        className="w-12 h-12 mx-auto mb-3 text-gray-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                    </svg>
                    <p>No choices added yet. Click "Add Choices" to get started.</p>
                </div>
            )}
        </div>
    );
}

export default CreateQuestionSetForm;
