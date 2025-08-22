import React, { useState } from "react";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import axios from "axios";
import type { IAttempQuestionForm } from "../../Pages/QuestionSet/AttemptQuestionSetPage";

export interface IAttemptQuizFinalData {
  questionSet: string;
  responses: {
    questionId: string;
    selectedChoicesIds: string[];
  }[];
}

function AttemptQuizForm({
  questionSet,
}: {
  questionSet: IAttempQuestionForm;
}) {
  const [result, setResult] = useState(null);
  const defaultValues: IAttempQuestionForm = {
    ...questionSet,
  };
  const methods = useForm({ defaultValues });

  const { watch, register, handleSubmit } = methods;
  console.log("form values => ", watch());

  const onSubmitHandler = (data: IAttempQuestionForm) => {
    const accessToken = localStorage.getItem("accessToken");

    const finalData: IAttemptQuizFinalData = {
      questionSet: data?._id,
      responses: data?.questions?.map((question) => {
        return {
          questionId: question?._id,
          selectedChoicesIds: question?.choices
            ?.filter((choice) => choice?.selected)
            ?.map((ch) => ch?._id),
        };
      }),
    };

    axios
      .post("http://localhost:3000/api/questions/answer/attempt", finalData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        alert("Answer Set Updated Successfully");
        setResult(res.data.data);
      })
      .catch((err) => {});
  };

  if (result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800 flex items-center justify-center p-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-12 text-center max-w-md w-full">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-yellow-500 mx-auto mb-6 flex items-center justify-center text-3xl font-bold text-white">
            Q
          </div>
          <h2 className="text-3xl font-bold text-yellow-200 mb-4">Quiz Complete!</h2>
          <p className="text-xl text-white/90">
            Your Score is: <span className="text-green-300 font-bold">{result?.score || 0}</span> out of{" "}
            <span className="text-yellow-300 font-bold">{result?.total || 0}</span> questions.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800 p-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-yellow-200 flex items-center justify-center gap-3 mb-2">
          <span className="text-3xl">✨</span>
          My Question Sets
          <span className="text-3xl">✨</span>
        </h1>
      </div>

      {/* Quiz Form */}
      <div className="max-w-4xl mx-auto">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-8">
            {/* Title Section */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-yellow-500 flex items-center justify-center text-2xl font-bold text-white">
                  Q
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-yellow-200">{questionSet?.title || "Quiz"}</h2>
                  <p className="text-white/70">— {questionSet?.questions?.length || 0} questions</p>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-white/80 text-lg font-medium mb-3">
                  Enter Title
                </label>
                <input 
                  {...register("title")} 
                  placeholder="Enter Title"
                  className="w-full bg-white/10 border border-white/30 rounded-2xl px-6 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            <CreateQuestions />

            {/* Submit Button */}
            <div className="flex justify-center pt-8">
              <button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 px-12 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-3 text-lg"
              >
                <span>🚀</span>
                Submit
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

function CreateQuestions() {
  const { control } = useFormContext<IAttempQuestionForm>();

  const { fields } = useFieldArray({
    control,
    name: "questions",
  });

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-yellow-200 mb-2">Questions</h2>
        <p className="text-white/70">Answer all questions below</p>
      </div>
      
      {fields?.map((field, index) => {
        return (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-8"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-yellow-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 mt-1">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold text-white leading-relaxed">
                {field?.questionText}
              </h3>
            </div>
            <CreateChoices questionIndex={index} />
          </div>
        );
      })}
    </div>
  );
}

function CreateChoices({ questionIndex }: { questionIndex: number }) {
  const { register, control } = useFormContext<IAttempQuestionForm>();

  const { fields } = useFieldArray({
    control,
    name: `questions.${questionIndex}.choices`,
  });

  const colors = [
    'from-orange-500 to-red-500',
    'from-green-500 to-emerald-500', 
    'from-pink-500 to-purple-500',
    'from-blue-500 to-cyan-500',
    'from-yellow-500 to-orange-500',
    'from-purple-500 to-pink-500'
  ];

  return (
    <div className="space-y-4 ml-14">
      {fields?.map((field, index) => {
        const colorScheme = colors[index % colors.length];
        
        return (
          <label
            key={index}
            className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
          >
            <div className="relative">
              <input
                type="checkbox"
                {...register(
                  `questions.${questionIndex}.choices.${index}.selected`
                )}
                className="sr-only"
              />
              <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${colorScheme} flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg`}>
                <div className="w-3 h-3 bg-white rounded opacity-0 group-has-[:checked]:opacity-100 transition-opacity duration-200"></div>
              </div>
            </div>
            <p className="text-white/90 group-hover:text-white transition-colors duration-300 text-lg">
              {field?.text}
            </p>
          </label>
        );
      })}
    </div>
  );
}

export default AttemptQuizForm;